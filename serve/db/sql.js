let sql = {
    getGrade:'select * from t_grade where learner_id = and lecture_id = ',
    //多表查詢
    //     select t1.id,t1.score,winton.name from t1,winton where t1.id=winton.id;
    // select Score, (select count(distinct Score) from scores where Score >= mq.Score) Rank from scores as mq order by Score desc
    //
    /**
     * 課程信息
     */
    //根據 課程名稱/學科分類/子學科分類/創建時間查課程信息（學生首頁）
    queryAllCourse:'select * from t_course',
    //根據課程ID查詢具體課程信息
    queryCourseByCourseId:(courseId)=>`select * from t_course where course_id = ${courseId}`,
    //根據課程ID，提交支付信息
    addPurchase:(courseId,learnerId,date)=>`INSERT INTO t_purchase (course_id, learner_id, date) VALUES (${courseId},${learnerId},${date})`,
    //根據學生ID查詢已購買課程信息
    queryPurchase: (learnerId) => `select * from t_purchase where learner_id = ${learnerId}`,
    //根據課程ID及學生ID查詢已學進度（區分video/documents）
    //根據課程ID查詢announcement（學生/教師）
    queryAnnounceByCourseId: (courseId)=>`select * from t_announcement where course_id = ${courseId} order by date desc`,
    //根據課程ID查詢課程相關章節信息
    queryLectureListByCourseId:(courseId)=>`select * from t_course where course_id = ${courseId} order by lecture_id asc`,
    //根據章節ID查詢章節相關信息
    queryLectureByLectureId:(lectureId)=>`select * from t_course where lecture_id = ${lectureId}`,
    //根據課程ID及學生ID查詢已參與考試信息
    queryGradeByCourseIdAndLearnerId:(courseId,learnerId) => `select * from t_course where course_id =  ${courseId} and learner_id = ${learnerId}`,
    //根據課程ID查詢章節考試信息（含已考）（學生/教師通用）
    //根據章節ID及學生ID提交考試答案
    //根據課程ID及討論類別查詢討論信息（學生閒/教師與學生）
    //根據課程ID及討論類別提交討論信息
    //根據教師ID查詢已上傳課程信息
    queryUploadedList:(userId)=>`select * from t_user where user_id = '${userId}'`,
    //根據教師ID刪除通知（教師）
    // deleteLectureById:(lectureId) => `DELETE FROM t_announcement WHERE lectureId = '${lectureId}'`,

    //根據課程ID提交新增通知（教師）
    addAnnouncement:(courseId,learnerId,date)=>`INSERT INTO t_announcement (course_id, learner_id, date) VALUES (${courseId},${learnerId},${date})`,
    //根據章節ID查詢參與考試學生列表（帶詳情）
    //根據章節ID提交分數及答案(教師)
    //提交課程（教師）
    //根據角色獲取用戶信息（學生/教師）
    //根據用戶ID獲取詳細信息，關聯查詢已上傳課程信息列表（結果為章節信息）
    //根據章節ID刪除相應章節
    deleteLectureById:(lectureId) => `DELETE FROM t_course WHERE lectureId = '${lectureId}'`,
    //根據學生ID獲取學生信息，關聯查詢已購買課程信息列表
    queryLearnerById:(userId) => `select * from t_user where user_id = '${userId}'`
}