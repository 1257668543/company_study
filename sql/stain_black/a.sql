SELECT
  to_date(create_time) AS create_date,
  order_id
FROM
  mid_staff_ripple_workflow_task
WHERE
  dt = '20220927'
  AND to_date(create_time) = '2022-09-23'
  AND flow_code = '030762'
LIMIT 100;