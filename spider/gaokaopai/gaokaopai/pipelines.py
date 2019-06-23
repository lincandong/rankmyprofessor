# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import os
import gaokaopai.util as util
from gaokaopai.items import ProfessorItem, SchoolItem

rootPath = os.getcwd() + '\\data'


class RootPipeline(object):

    def open_spider(self, spider):
        util.mkdir(rootPath)
        return spider


class WritePipeline(object):

    def process_item(self, item, spider):
        # if isinstance(item, SchoolItem):
        # print(type(item))
        if(isinstance(item, ProfessorItem)):
            professor = item
            university = professor['university']
            province = professor['province']
            schoolPath = rootPath + '\\' + province + '\\' + university
            util.mkdir(schoolPath)

            college = professor['college']
            collegePath = schoolPath + '\\' + college
            util.mkdir(collegePath)

            profName = professor['name']
            profPath = collegePath + '\\' + profName
            util.mkdir(profPath)
            util.exportJson(profPath+'\\', item['name'], dict(item))
        elif(isinstance(item, SchoolItem)):
            school = item
            schoolName = school['school']
            province = school['province']
            schoolPath = rootPath + '\\' + province + '\\' + schoolName
            util.mkdir(schoolPath)
            util.exportJson(schoolPath+'\\', schoolName, dict(school))
        # print('11111111111111111111111111111')
        # return item
