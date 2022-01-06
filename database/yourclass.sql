/*
Navicat MySQL Data Transfer

Source Server         : db
Source Server Version : 80023
Source Host           : localhost:3306
Source Database       : yourclass

Target Server Type    : MYSQL
Target Server Version : 80023
File Encoding         : 65001

Date: 2021-04-30 02:14:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course` (
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'id',
  `lecturer_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subject_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subclass_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `hours` decimal(6,2) NOT NULL,
  `cover` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chapter_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chapter_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `c_idx` int NOT NULL,
  `idx` int NOT NULL,
  `lecture_id` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lecture_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1',
  `document` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `assignment` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `wechat` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lecturer` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date` bigint NOT NULL,
  `valid` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  PRIMARY KEY (`lecture_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_course
-- ----------------------------
INSERT INTO `t_course` VALUES ('f79ef750-a39f-11eb-8118-c5bd6c8c2356', '75056460-a39e-11eb-99b4-676f22530ea7', 'Natural Law', '01', '0101', '50.00', '50.00', '/2021-04-22/upload-1619119226935.jfif', '\nWhat Is Natural Law?\nNatural law is a theory in ethics and philosophy that says that human beings possess intrinsic values that govern our reasoning and behavior. Natural law maintains that these rules of right and wrong are inherent in people and are not created by society or court judges.\n\n\nKEY TAKEAWAYS\nThe theory of natural law says that humans possess an intrinsic sense of right and wrong that governs our reasoning and behavior.\nThe concepts of natural law are ancient, stemming from the times of Plato and Aristotle.\nNatural law is constant throughout time and across the globe because it is based on human nature, not on culture or customs.\nUnderstanding Natural Law\nNatural law holds that there are universal moral standards that are inherent in humankind throughout all time, and these standards should form the basis of a just society. Human beings are not taught natural law per se, but rather we “discover” it by consistently making choices for good instead of evil. Some schools of thought believe that natural law is passed to humans via a divine presence. Although natural law mainly applies to the realm of ethics and philosophy, it is also used extensively in theoretical economics.\n\n\nNatural Law vs. Positive Law\nThe theory of natural law believes that our civil laws should be based on morality, ethics, and what is inherently correct. This is in contrast to what is called \"positive law\" or \"man-made law,\" which is defined by statute and common law and may or may not reflect the natural law. ', 'f79ef750-a39f-11eb-8118-c5bd6c8c23560', 'chapter 1', '0', '0', 'f79f1e60-a39f-11eb-8118-c5bd6c8c2356', 'Defination', '/2021-04-22/upload-1619119265971.mp4', 'video', null, 'What is Natural law?', '', 'Anto Xu', '1619119301446', '0');

-- ----------------------------
-- Table structure for t_course_mark
-- ----------------------------
DROP TABLE IF EXISTS `t_course_mark`;
CREATE TABLE `t_course_mark` (
  `course_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `learner_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mark` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_course_mark
-- ----------------------------
INSERT INTO `t_course_mark` VALUES ('f79ef750-a39f-11eb-8118-c5bd6c8c2356', '17707ba0-a39e-11eb-b560-f390e27840f2', '3');
INSERT INTO `t_course_mark` VALUES ('f79ef750-a39f-11eb-8118-c5bd6c8c2356', '64774b60-a40a-11eb-afc9-43fb7802d66c', '4');

-- ----------------------------
-- Table structure for t_discussion_learner
-- ----------------------------
DROP TABLE IF EXISTS `t_discussion_learner`;
CREATE TABLE `t_discussion_learner` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` bigint NOT NULL,
  `learner` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_discussion_learner
-- ----------------------------

-- ----------------------------
-- Table structure for t_discussion_lecturer
-- ----------------------------
DROP TABLE IF EXISTS `t_discussion_lecturer`;
CREATE TABLE `t_discussion_lecturer` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lecturer_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` bigint NOT NULL,
  `role_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lecturer` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_discussion_lecturer
-- ----------------------------
INSERT INTO `t_discussion_lecturer` VALUES ('91f6bea0-a409-11eb-857b-d528cf544bcd', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', '75056460-a39e-11eb-99b4-676f22530ea7', '17707ba0-a39e-11eb-b560-f390e27840f2', 'Morning Anto!', '1619164657545', '2', 'TanShi', 'Anto Xu');

-- ----------------------------
-- Table structure for t_grade
-- ----------------------------
DROP TABLE IF EXISTS `t_grade`;
CREATE TABLE `t_grade` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lecture_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lecturer_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `question` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `answer` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `grade` double(5,2) DEFAULT NULL,
  `date` bigint NOT NULL,
  `reference` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_grade
-- ----------------------------
INSERT INTO `t_grade` VALUES ('73a07ff0-a41c-11eb-9fa2-7b6b4ea47f7b', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', 'f79f1e60-a39f-11eb-8118-c5bd6c8c2356', '75056460-a39e-11eb-99b4-676f22530ea7', '17707ba0-a39e-11eb-b560-f390e27840f2', 'What is Natural law?', 'ddddd', '5.00', '1619172767087', 'feffe');

-- ----------------------------
-- Table structure for t_learning_record
-- ----------------------------
DROP TABLE IF EXISTS `t_learning_record`;
CREATE TABLE `t_learning_record` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lecture_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'learned',
  `date` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_learning_record
-- ----------------------------
INSERT INTO `t_learning_record` VALUES ('a0365bb0-a409-11eb-816d-d538b11b7c9b', '17707ba0-a39e-11eb-b560-f390e27840f2', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', 'f79f1e60-a39f-11eb-8118-c5bd6c8c2356', 'video', '1619164681451');

-- ----------------------------
-- Table structure for t_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` bigint NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `valid` int(1) unsigned zerofill NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_notice
-- ----------------------------
INSERT INTO `t_notice` VALUES ('d36971a0-a41a-11eb-9880-f14c65411496', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', 'sssssss', '1619172068794', 'Gradle真能干掉Maven？今天体验了一把，贼爽！', '1');

-- ----------------------------
-- Table structure for t_purchase
-- ----------------------------
DROP TABLE IF EXISTS `t_purchase`;
CREATE TABLE `t_purchase` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `learner_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` bigint NOT NULL,
  `lecturer_id` varchar(40) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'amount',
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT 'audit status',
  `learner_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'learner name',
  `lecturer_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'lecturer name',
  `valid` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT 'valid',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_purchase
-- ----------------------------
INSERT INTO `t_purchase` VALUES ('66b568a0-a8f9-11eb-86e4-6dc25e8eac1c', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', '17707ba0-a39e-11eb-b560-f390e27840f2', '1619707468842', '75056460-a39e-11eb-99b4-676f22530ea7', '50.00', '1', 'TanShi', 'Anto Xu', '0');
INSERT INTO `t_purchase` VALUES ('71651410-a40a-11eb-a734-e9a5c7395b20', 'f79ef750-a39f-11eb-8118-c5bd6c8c2356', '64774b60-a40a-11eb-afc9-43fb7802d66c', '1619165032401', '', '0.00', '', '', '', '0');

-- ----------------------------
-- Table structure for t_subject
-- ----------------------------
DROP TABLE IF EXISTS `t_subject`;
CREATE TABLE `t_subject` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `subject` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'subject_name',
  `subject_code` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'subject_code',
  `subclass` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'subclass_name',
  `subclass_code` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name_index` (`subject`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='t_subject';

-- ----------------------------
-- Records of t_subject
-- ----------------------------
INSERT INTO `t_subject` VALUES ('1', 'Philosophy', '01', null, null);
INSERT INTO `t_subject` VALUES ('2', 'Law', '02', null, null);
INSERT INTO `t_subject` VALUES ('3', 'Sociology', '03', null, null);
INSERT INTO `t_subject` VALUES ('4', 'Education', '04', null, null);
INSERT INTO `t_subject` VALUES ('5', 'Psychology', '05', null, null);
INSERT INTO `t_subject` VALUES ('6', 'Economics', '06', null, null);
INSERT INTO `t_subject` VALUES ('7', 'Finance', '07', null, null);
INSERT INTO `t_subject` VALUES ('8', 'Mathematics', '08', null, null);
INSERT INTO `t_subject` VALUES ('9', 'Computer', '09', '', '');
INSERT INTO `t_subject` VALUES ('11', 'Philosophy', '01', 'Philosophy', '0101');
INSERT INTO `t_subject` VALUES ('12', 'Law', '02', 'Law', '0201');
INSERT INTO `t_subject` VALUES ('13', 'Sociology', '03', 'Sociology', '0301');
INSERT INTO `t_subject` VALUES ('14', 'Education', '04', 'Education', '0401');
INSERT INTO `t_subject` VALUES ('15', 'Psychology', '05', 'Psychology', '0501');
INSERT INTO `t_subject` VALUES ('16', 'Economics', '06', 'Economics', '0601');
INSERT INTO `t_subject` VALUES ('17', 'Finance', '07', 'Finance', '0701');
INSERT INTO `t_subject` VALUES ('18', 'Mathematics', '08', 'Mathematics', '0801');
INSERT INTO `t_subject` VALUES ('19', 'Computer', '09', 'Software Engineering', '0901');
INSERT INTO `t_subject` VALUES ('20', 'Computer', '09', 'Network Engineering', '0902');
INSERT INTO `t_subject` VALUES ('21', 'Computer', '09', 'Internet of Things Engineering', '0903');
INSERT INTO `t_subject` VALUES ('22', 'Computer', '09', 'Digital Media Technology', '0904');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'id',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'username',
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'password',
  `first_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'first_name',
  `middle_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'middle_name',
  `last_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'last_name',
  `role` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'role',
  `subject` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'subject',
  `certificate` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'ceritifacate',
  `register_time` bigint NOT NULL COMMENT 'register_time',
  `balance` bigint NOT NULL DEFAULT '0' COMMENT 'balance',
  `verified` varchar(1) NOT NULL DEFAULT '0' COMMENT 'account should be verified',
  `valid` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT 'valid',
  PRIMARY KEY (`username`) USING BTREE,
  KEY `registertime_name_idx` (`register_time`,`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='t_user';

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('e5cc8960-a8eb-11eb-923b-6762dd0f5232', 'admin', '81ba044f9db0a59f836206f282b4d195', '23132', '', 'admin', '0', '', '', '1619701669111', '0', '1', '0');
INSERT INTO `t_user` VALUES ('75056460-a39e-11eb-99b4-676f22530ea7', 'AntoXu', 'd832437f174dfbdf6f5297800cb232cf', 'Anto', '', 'Shi', '1', '01', '/2021-04-22/upload-1619118607068.jpg', '1619118652838', '100', '1', '0');
INSERT INTO `t_user` VALUES ('466540a0-a90a-11eb-804d-21140be10239', 'demo', '81ba044f9db0a59f836206f282b4d195', 'demo', '', 'demo', '2', '', '', '1619714716075', '2371', '1', '0');
INSERT INTO `t_user` VALUES ('64774b60-a40a-11eb-afc9-43fb7802d66c', 'JiachengShen', 'd832437f174dfbdf6f5297800cb232cf', 'Jiacheng', '', 'Shen', '2', '', '', '1619165010711', '0', '1', '0');
INSERT INTO `t_user` VALUES ('17707ba0-a39e-11eb-b560-f390e27840f2', 'TanShi', 'd832437f174dfbdf6f5297800cb232cf', 'Tan', '', 'Shi', '2', '', '', '1619118495843', '5550', '1', '0');
