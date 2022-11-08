const edges = JSON.parse('[{"from":"job_a","to":"actual_table_dwd_test_zgb_20211009_da_255_1714304531969","key":true},{"from":"job_b","to":"actual_table_dwd_test_zgb_20211009_da_255_1714304531969"},{"from":"actual_table_dwd_test_zgb_20211009_da_255_1714304531969","to":"job_c"},{"from":"job_c","to":"job_e"},{"from":"actual_table_dwd_test_zgb_20211009_da_255_1714304531969","to":"job_d"},{"from":"job_d","to":"job_e"},{"from":"job_e","to":"job_f"},{"from":"job_d","to":"job_g"},{"from":"job_g","to":"job_h"},{"from":"job_h","to":"job_i"},{"from":"job_i","to":"job_1"},{"from":"job_1","to":"job_2"},{"from":"job_2","to":"job_3"},{"from":"job_3","to":"job_4"},{"from":"job_4","to":"job_5"},{"from":"job_5","to":"job_6"},{"from":"job_6","to":"job_7"},{"from":"job_7","to":"job_8"},{"from":"job_8","to":"job_9"},{"from":"job_9","to":"job_10"}]');

const nodes = JSON.parse('[{"name":"job_a","full_name":"测试","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"UPSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":62,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_b","full_name":"测试","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"UPSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":1062,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"actual_table_dwd_test_zgb_20211009_da_255_1714304531969","full_name":"test","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":62,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_c","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":612,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_d","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_e","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_f","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_g","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_h","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_i","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_1","full_name":"测试","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"UPSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":62,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_2","full_name":"测试","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"UPSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":1062,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_3","full_name":"test","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":62,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_4","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":612,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_5","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_6","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_7","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_8","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_9","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100},{"name":"job_10","full_name":"工厂员工管理","url":"http://schedule.corp.bianlifeng.com/job/mid_staff_info","stream":"DOWNSTREAM","owner":"yin.qi","business":99,"start_time":"2022-01-06 02:03:07","end_time":"2022-01-06 02:04:09","duration":6123122,"status":"SUCCESS","context":"2022/01/05/02","cpu":100,"memory":100,"rmb":100}]');

function getRelationNodes(edges, node1, node2) {
  let res = {};
  const res1 = drillDown(edges, node1, node2);
  const res2 = drillDown(edges, node2, node1);
  let relationEdges = false;
  if (res1) {
    res.nodes = [...new Set(res1)];
    res.edges = edges.filter(i => res1.includes(i.from) && res1.includes(i.to));
  } else if (res2) {
    res.nodes = [...new Set(res2)];
    relationEdges = edges.filter(i => res2.includes(i.from) && res2.includes(i.to));
  } else {
    res.nodes = '选择的任务没有依赖关系';
    res.edges = '选择的任务没有依赖关系';
  }
  return res;
}

function drillDown(edges, currentNode, targetNode) {
  const res = [];
  const downStream = edges.filter(i => i.from === currentNode);
  if (!downStream.length) {
    // 抵达最底层
    return null;
  }
  for (let i = 0; i < downStream.length; i++) {
    if (downStream[i].to === targetNode) {
      console.log(currentNode, targetNode);
      return [currentNode, targetNode];
    }
    const nxtLevelRes = drillDown(edges, downStream[i].to, targetNode);
    if (nxtLevelRes) {
      res.push(...nxtLevelRes);
    }
  }
  if (res.length) {
    res.splice(0, 0, currentNode);
  }
  return res;
}

function tco(f) {
  let value;
  let active = false;
  const accumulated = [];
  return function accmulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false;
      return value;
    }
  }
}

var obj=tco(function(x,y){
  if(y > 1){
      return obj(x + 1, y - 1);
  }else{
      return x;
  }
})

console.log(obj(2, 1000));
