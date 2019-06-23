# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class SchoolItem(scrapy.Item):
    province = scrapy.Field()
    # img = scrapy.Field()
    school = scrapy.Field()
    info = scrapy.Field()
    baseInfo = []
    url = scrapy.Field()
    colleges = []


class ProfessorItem(scrapy.Item):
    province = scrapy.Field()
    university = scrapy.Field()
    college = scrapy.Field()
    name = scrapy.Field()
