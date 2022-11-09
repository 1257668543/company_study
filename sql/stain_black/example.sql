SELECT
  '便利店' as business,
  shopCode as root_code,
  'shop' as entity_name,
  shopCode as entity_code,
  case
    when error_type = '有货不陈列' then 'display_miss_intervene_black_shelf_list'
    when error_type = '陈列多' then 'display_more_intervene_black_shelf_list'
    when error_type = '陈列空' then 'empty_intervene_black_shelf_list'
  end as attr_name,
  concat (
    '[',
    concat_ws(',', collect_set(concat_ws(',', attr_value))),
    ']'
  ) as attr_value,
  concat(unix_timestamp(current_timestamp()), '000') as event_time,
  '33' as data_source,
  '' as replay_no
FROM
  (
    SELECT
      order_id,
      create_time,
      max(shopCode) as shopCode,
      max(error_type) as error_type,
      collect_set(shelf) as attr_value
    from
      (
        SELECT
          order_id,
          create_time,
          index,
          seq,
          max(if(form_name = 'id', value, null)) as shelf,
          max(if(form_name = 'defectType', value, null)) as error_type,
          max(if(form_name = 'evidencePicture', value, null)) as feedbackPics,
          max(if(form_name = 'code', value, null)) as shopCode,
          max(if(form_name = 'confirmFeedback', value, null)) as confirmFeedback,
          max(if(form_name = 'abnormalType', value, null)) as abnormalType
        from
          (
            SELECT
              order_id,
              form_name,
              index,
              seq,
              get_json_object(form_value, '$.value') AS value,
              create_date AS create_time,
              regexp_extract(
                get_json_object(form_value, '$.value'),
                '\\(([0-9]+)\\)',
                1
              ) as shelf_id
            FROM
              (
                SELECT
                  order_id,
                  create_date,
                  form_name,
                  index,
                  seq,
                  form_values,
                  dense_rank() over(
                    partition BY order_id
                    ORDER BY
                      dt DESC
                  ) AS rn
                FROM
                  (
                    SELECT
                      a.order_id,
                      form_name,
                      index,
                      seq,
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
                          dt <= '${today-1}'
                          AND to_date(create_time) >= '2022-06-20'
                          AND flow_code = '029924' --and order_id='2110111298370452'
                      ) b ON a.order_id = b.order_id
                    WHERE
                      dt <= '${today-1}'
                      AND dt >= '20220530' --and a.order_id='2110111298370452'
                      AND form_name IN (
                        'code',
                        'defectType',
                        'id',
                        'evidencePicture',
                        'confirmFeedback',
                        'abnormalType'
                      )
                  ) t0
              ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
            WHERE
              rn = 1
          ) t2
        group by
          order_id,
          create_time,
          index,
          seq
      ) t3
    where
      shopCode is not null
      or (
        shopCode is null
        and confirmFeedback = '是'
        and abnormalType = '算法问题'
        and shelf is not null
        and feedbackPics != ''
      )
    group by
      order_id,
      create_time
  ) t4
group by
  shopCode,
  case
    when error_type = '有货不陈列' then 'display_miss_intervene_black_shelf_list'
    when error_type = '陈列多' then 'display_more_intervene_black_shelf_list'
    when error_type = '陈列空' then 'empty_intervene_black_shelf_list'
  end