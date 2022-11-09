SELECT
  -- pv结构
  '便利店' as business,
  root_code,
  'robot_hrcamera_stain' as entity_name,
  entity_code,
  'feedback_black' as attr_name,
  concat (
    '[',
    concat_ws(',', collect_set(concat_ws(',', attr_value))),
    ']'
  ) as attr_value,
  concat(
    unix_timestamp(date_sub(current_timestamp(), 3)),
    '000'
  ) as event_time,
  '35' as data_source,
  '' as replay_no
FROM
  (
    SELECT
      order_id,
      max(shopCode) as root_code,
      max(device_id) as entity_code,
      collect_set(coordinate) as attr_value
    FROM
      (
        (
          -- 主表 device_id & shopCode
          SELECT
            order_id as main_order_id,
            max(if(form_name = 'code', value, null)) as shopCode,
            max(if(form_name = 'device_id', value, null)) as device_id
          FROM
            (
              SELECT
                order_id,
                form_name,
                get_json_object(form_value, '$.value') AS value
              FROM
                (
                  SELECT
                    a.order_id,
                    form_name,
                    form_values,
                    create_date,
                    dt
                  FROM
                    pdw_order_store_211_order_detail_flow_form_variable_groups_di a
                    JOIN (
                      SELECT
                        to_date(create_time) AS create_date,
                        order_id,
                        initiator_code,
                        org_name,
                        order_status
                      FROM
                        mid_staff_ripple_workflow_task
                      WHERE
                        dt = '${today-1}'
                        AND to_date(create_time) >= '2022-06-20'
                        AND flow_code = '030762'
                    ) b ON a.order_id = b.order_id
                  WHERE
                    dt >= '${today-30}'
                    AND form_name IN ('code', 'device_id')
                ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
            ) q1
          GROUP BY
            order_id
        ) a
        JOIN (
          -- 子表 confirmFeedback & location
          SELECT
            order_id,
            confirmFeedback,
            coordinate
          FROM
            (
              SELECT
                order_id,
                index,
                max(if(form_name = 'confirmFeedback', value, null)) as confirmFeedback,
                max(if(form_name = 'location', value, null)) as coordinate
              FROM
                (
                  SELECT
                    order_id,
                    form_name,
                    index,
                    get_json_object(form_value, '$.value') AS value
                  FROM
                    (
                      SELECT
                        a.order_id,
                        form_name,
                        index,
                        form_values,
                        create_date,
                        dt
                      FROM
                        pdw_order_store_211_order_detail_flow_form_variable_groups_di a
                        JOIN (
                          SELECT
                            to_date(create_time) AS create_date,
                            order_id,
                            initiator_code,
                            org_name,
                            order_status
                          FROM
                            mid_staff_ripple_workflow_task
                          WHERE
                            dt = '${today-1}'
                            AND to_date(create_time) >= '2022-06-20'
                            AND flow_code = '030762'
                        ) b ON a.order_id = b.order_id
                      WHERE
                        dt >= '${today-30}'
                        AND form_name IN ('confirmFeedback', 'location')
                    ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
                ) z
              GROUP BY
                order_id,
                index
            ) q2
          where
            confirmFeedback = 'A1'
            or confirmFeedback = 'A2'
          group by
            order_id,
            confirmFeedback,
            coordinate
        ) b on a.main_order_id = b.order_id
      )
    GROUP BY
      order_id
  ) p
GROUP BY
  root_code,
  entity_code,
  attr_value;