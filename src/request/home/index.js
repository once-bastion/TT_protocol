import http from '../http.js';

// get请求
// let getvip = (params) => {
//   return http({
//     url: '/grade/grade',
//     params
//   })
// }

// post请求
// let addvip = (data) => {
//   return http({
//     method: 'POST',
//     url: '/grade/grade',
//     data
//   })
// }
let member = (data) => {
  return http({
    method: 'POST',
    url: '/Member/index',
    data
  })
}
let memberUpdate = (data) => {
  return http({
    method: 'POST',
    url: '/Member/update',
    data
  })
}
let memberDel = (data) => {
  return http({
    method: 'POST',
    url: '/Member/delete',
    data
  })
}
let material = (data) => {
  return http({
    method: 'POST',
    url: '/material/index',
    data
  })
}
let typecontrol = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/index',
    data
  })
}
let typecontrol_list = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/indexlist',
    data
  })
}
let typecontrol_add = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/add',
    data
  })
}
let typecontrol_softDel = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/Soft_deletion',
    data
  })
}
let typecontrol_del = (data) => {
  return http({
    method: 'POST',
    url: '/Typecontrol/delete',
    data
  })
}
let material_add = (data) => {
  return http({
    method: 'POST',
    url: '/Material/add',
    data
  })
}
let material_del = (data) => {
  return http({
    method: 'POST',
    url: '/material/delete',
    data
  })
}
let headImage = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/index',
    data
  })
}
let headModify = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/modify_state',
    data
  })
}
let head_image_add = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/add',
    data
  })
}
let head_image_del = (data) => {
  return http({
    method: 'POST',
    url: '/Headimage/delete',
    data
  })
}
let nickName = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/index',
    data
  })
}
let nickModify = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/modify_state',
    data
  })
}
let nickName_add = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/add',
    data
  })
}
let nickName_del = (data) => {
  return http({
    method: 'POST',
    url: '/Nickname/delete',
    data
  })
}
let autograph = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/index',
    data
  })
}
let autograph_add = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/add',
    data
  })
}
let autograph_del = (data) => {
  return http({
    method: 'POST',
    url: '/Autograph/delete',
    data
  })
}
let memberVideo = (data) => {
  return http({
    method: 'POST',
    url: '/Membervideo/index',
    data
  })
}
let memberView = (data) => {
  return http({
    method: 'POST',
    url: '/Membervideo/view',
    data
  })
}
let collectionVideo = (data) => {
  return http({
    method: 'POST',
    url: '/Membervideo/collection_video',
    data
  })
}
let commentList = (data) => {
  return http({
    method: 'POST',
    url: '/Commentlist/index',
    data
  })
}
let twoComment = (data) => {
  return http({
    method: 'POST',
    url: '/Commentlist/twocomment',
    data
  })
}
let getUserInfo = (data) => {
  return http({
    method: 'POST',
    url: '/member/getuserinfo',
    data
  })
}
let getfollowinglist = (data) => {
  return http({
    method: 'POST',
    url: '/Followinglist/getfollowinglist',
    data
  })
}
let followingList_index = (data) => {
  return http({
    method: 'POST',
    url: '/Followinglist/index',
    data
  })
}
let videoTasks_add = (data) => {
  return http({
    method: 'POST',
    url: '/Videotasks/add',
    data
  })
}
let videoTasks = (data) => {
  return http({
    method: 'POST',
    url: '/Videotasks/index',
    data
  })
}
let videoTaskDetails = (data) => {
  return http({
    method: 'POST',
    url: '/Videotaskdetails/index',
    data
  })
}
let videoComments_add = (data) => {
  return http({
    method: 'POST',
    url: '/Videocomments/add',
    data
  })
}
let videoComments = (data) => {
  return http({
    method: 'POST',
    url: '/Videocomments/index',
    data
  })
}

export default {
  // getvip,
  // addvip,
  member,
  memberUpdate,
  memberDel,
  material,
  typecontrol,
  typecontrol_list,
  typecontrol_add,
  typecontrol_softDel,
  typecontrol_del,
  material_add,
  material_del,
  headImage,
  headModify,
  head_image_add,
  head_image_del,
  nickModify,
  nickName,
  nickName_add,
  nickName_del,
  autograph,
  autograph_add,
  autograph_del,
  memberVideo,
  memberView,
  collectionVideo,
  commentList,
  twoComment,
  getUserInfo,
  getfollowinglist,
  followingList_index,
  videoTasks_add,
  videoTasks,
  videoTaskDetails,
  videoComments_add,
  videoComments,
}
