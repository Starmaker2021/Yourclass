const Mock = require('mockjs')
/**
 * student data
 */
//學生信息
export const student = Mock.mock({
  'purchased|1-10':[
    '001'
  ]
})
//帶篩選列表
export const courseList = Mock.mock({
  'list|132-140': [{
    'id|+1': Mock.mock('@id'),
    'cover': Mock.Random.dataImage('320x180'),
    'courseName':Mock.Random.name(),
    'lecture':Mock.Random.name(),
    'subject':'math'
  }],
  'filter':{
    'subject':[{text:'math', key:'01'}, {text:'art', key:'02'}, {text:'music', key:'03'}],
    'lecturer':[{text:'jame', key:'01'}, {text:'tommy', key:'02'}, {text:'jackson', key:'03'}],
    'date':[2010, 2011, 2012, 2013]
  }
})
//課程詳情
export const courseDetail=Mock.mock({
  'cover':Mock.Random.dataImage('200x100'),
  'process':{
    video:6,
    document:15
  },
  'courseDetail|1-10':[{
    charterName:Mock.Random.word(),
    'lectures|1-10':[
      {
        lectureName:Mock.Random.name(),
        'type':'0',
        'video':'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        document:Mock.Random.sentence(),
        assignment:Mock.Random.sentence()
      }
    ]
  }, {}]
})
//Q&A Area
export const QADiscussion = Mock.mock({
  'list|1-10':[{
    'studentId':Mock.mock('@id'),
    'studentName':Mock.Random.name(),
    'content':Mock.Random.sentence(),
    'date':Mock.Random.datetime()
  }]
})
/**
 * teacher data
 */
export const uploadedData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': '001',
    'shortCut': '',
    'courseName':'',
    'lecture':''
  }]
})
//具體課程相關的通知信息
export const courseAnnouncement = Mock.mock(
  {
    'courseId':'',
    'list|1-10': [{
      'id|+1': '001',
      'title':'',
      'content':''
    }]
  }
)
//具體課程相關的考試信息
export const courseExaminationList = Mock.mock(
  {
    'id|+1': '001',
    'list|1-10': [{
      'examId|+1': '001',
      'title':''
    }]
  }
)
//具體課程相關的考試信息
export const participants = Mock.mock(
  {
    'id|+1': '001',
    'title':'',
    'list|1-10': [{
      'participantId':'',
      'participant':'',
      'answer':'',
      'grade':null,
      'comment':''
    }]
  }
)
//教師與學生對話列表
export const discussionList = Mock.mock({
  'list|1-10': [{
    'courseId':'',
    'studentId':'',
    'lectureId':'',
    'lectureName':null,
    'studentName':''
  }]
})
//教師與單個學生對話
export const discussionDetail = Mock.mock({
  'list|1-10':[{
    'writer':'',
    'content':''
  }]
})
/**
 * admin data
 */
//teacher data list
export const teacherListData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-100': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'name': Mock.Random.name(),
    'subject':Mock.Random.word(),
    'uploaded':[
      {
        'name':Mock.Random.name(),
        'chapterNo':1,
        'lectureNo':1,
        'type':'0',
        'number|0-1': 0,
        'video':'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        'document':Mock.Random.sentence()
      }
    ]
  }]
})
//teacher detail data
export const teacherDetailData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'name': '',
    'subject':'',
    'certificate':'',
    'uploaded':[
      {
        'name':'',
        'chapterNo':1,
        'lectureNo':1,
        'type':''
      }
    ]
  }]
})
export const studentListData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-100': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 100001,
    'name': Mock.Random.name(),
    'subject':'',
    'purchase|1-10':[
      {
        'id|+1': 100001,
        'course': Mock.Random.name(),
        'subject': Mock.Random.word(),
        'lecturer':Mock.Random.name(),
        'price':(Math.random()*100).toFixed(2)
      }
    ]
  }]
})
export const studentDetailData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'name': '',
    'subject':'',
    'Certificate':'',
    'purchased':[
      {
        'id':'',
        'courseName':1,
        'subject':1,
        'lecture':'',
        'price':'',
        'date':''
      }
    ]
  }]
})