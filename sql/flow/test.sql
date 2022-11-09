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
              dt = '20220925'
              AND to_date(create_time) >= '2022-06-20'
              AND flow_code = '030762'
          ) b ON a.order_id = b.order_id
        WHERE
          dt = '20220925'
          AND form_name IN ('code', 'device_id')
      ) t1 LATERAL VIEW explode(hivemall.json_split(form_values)) x AS form_value
  ) q1
GROUP BY
  order_id,
  create_time
LIMIT 100;