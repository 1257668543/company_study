SELECT
  order_id,
  create_time,
  device_id,
  coordinate,
  rectification_picture
FROM
  (
    SELECT
      order_id,
      create_time,
      max(device_id) as device_id,
      coordinate,
      rectification_picture
    FROM
      (
        (
          -- 主表 device_id & create_time
          SELECT
            order_id as main_order_id,
            create_time,
            max(if(form_name = 'device_id', value, null)) as device_id
          FROM
            (
              SELECT
                order_id,
                form_name,
                create_time,
                get_json_object(form_value, '$.value') AS value
              FROM
                (
                  SELECT
                    a.order_id,
                    form_name,
                    form_values,
                    create_time,
                    dt
                  FROM
                    pdw_order_store_211_order_detail_flow_form_variable_groups_di a
                    JOIN (
                      SELECT
                        create_time,
                        order_id,
                        initiator_code,
                        org_name,
                        order_status
                      FROM
                        mid_staff_ripple_workflow_task
                      WHERE
                        dt = '20220927'
                        AND to_date(create_time) >= '2022-06-20'
                        AND flow_code = '030762'
                    ) b ON a.order_id = b.order_id
                  WHERE
                    dt = '20220927'
                    AND form_name IN ('code', 'device_id')
                ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
            ) q1
          GROUP BY
            order_id,
            create_time
        ) c1
        JOIN (
          -- 子表 confirmFeedback & coordinate & rectification_picture
          SELECT
            order_id,
            confirmFeedback,
            coordinate,
            rectification_picture
          FROM
            (
              SELECT
                order_id,
                index,
                max(if(form_name = 'confirmFeedback', value, null)) as confirmFeedback,
                max(if(form_name = 'location', value, null)) as coordinate,
                max(
                  if(form_name = 'RectificationPicture', value, null)
                ) as rectification_picture
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
                            dt = '20220927'
                            AND to_date(create_time) >= '2022-06-20'
                            AND flow_code = '030762'
                        ) b ON a.order_id = b.order_id
                      WHERE
                        dt >= '20220927'
                        AND form_name IN (
                          'confirmFeedback',
                          'location',
                          'RectificationPicture'
                        )
                    ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
                ) z
              GROUP BY
                order_id,
                index
            ) q
          where
            confirmFeedback = 'A1'
            or confirmFeedback = 'A2'
          group by
            order_id,
            confirmFeedback,
            coordinate,
            rectification_picture
        ) c2 on c1.main_order_id = c2.order_id
      )
    GROUP BY
      order_id,
      create_time,
      coordinate,
      rectification_picture
  ) mix
GROUP BY
  order_id,
  create_time,
  device_id,
  coordinate,
  rectification_picture;