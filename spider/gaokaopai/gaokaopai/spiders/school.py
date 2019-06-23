import scrapy
import os
import sys
import gaokaopai.util as util
import operator as op
from gaokaopai.items import SchoolItem, ProfessorItem

rootPath = os.getcwd() + '\\data\\'
domain = "http://www.gaokaopai.com/"


class SchoolSpider(scrapy.Spider):
    name = "school"
    allowed_domains = ["gaokaopai.com"]
    start_urls = [
        "http://www.gaokaopai.com/daxue-11-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-12-0-0-0-0-0-0.html",  # 天津error
        "http://www.gaokaopai.com/daxue-13-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-14-0-0-0-0-0-0.html",  # 山西error
        "http://www.gaokaopai.com/daxue-15-0-0-0-0-0-0.html",  # 内蒙古error
        "http://www.gaokaopai.com/daxue-21-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-22-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-23-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-31-0-0-0-0-0-0.html",  # 上海error
        "http://www.gaokaopai.com/daxue-32-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-33-0-0-0-0-0-0.html",   # 浙江
        "http://www.gaokaopai.com/daxue-34-0-0-0-0-0-0.html",  # 安徽error
        "http://www.gaokaopai.com/daxue-35-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-36-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-37-0-0-0-0-0-0.html",  # 山东error
        "http://www.gaokaopai.com/daxue-41-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-42-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-44-0-0-0-0-0-0.html",  # 广东error
        "http://www.gaokaopai.com/daxue-45-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-46-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-50-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-51-0-0-0-0-0-0.html",  # 四川error
        "http://www.gaokaopai.com/daxue-52-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-53-0-0-0-0-0-0.html",  # 云南error
        "http://www.gaokaopai.com/daxue-54-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-61-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-62-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-63-0-0-0-0-0-0.html",
        "http://www.gaokaopai.com/daxue-64-0-0-0-0-0-0.html",  # 宁夏error
        "http://www.gaokaopai.com/daxue-65-0-0-0-0-0-0.html"
    ]

    def parse(self, response):
        province = response.xpath(
            "/html/body/div[1]/div[10]/div/div[1]/dl[2]/dd//span[@class=\'on\']/a/text()").extract()[0]
        print("processing: " + rootPath + province + '\n')
        util.mkdir(rootPath + province)
        for item in response.xpath("/html/body/div[1]/div[10]/div/div[4]/ul/li"):
            school = SchoolItem()
            # school['img'] = item.xpath('div[1]/a/img/@src').extract()[0]
            school['province'] = province
            school['school'] = item.xpath(
                "div[2]/div[1]/h3/a/text()").extract()[0]

            school['url'] = item.xpath(
                "div[2]/div[1]/h3/a/@href").extract()[0]

            print('-----------------------\n')
            print(school)
            yield scrapy.Request(school['url'], callback=self.parse_school, meta={'school': school})
            # break

        # print(response.meta)
        if len(response.meta) is 4:
            maxPage = response.xpath(
                "/html/body//span[@class=\"pageInfo\"]/text()").extract()[0]
        else:
            maxPage = response.meta['maxPage']

        nextPage = domain + response.xpath(
            "/html/body/div[1]/div[10]/div/div[4]/div/a[last()-1]/@href").extract()[0]

        currentPage = response.xpath(
            "/html/body//span[@class=\"current\"]/text()").extract()[0]

        if not op.eq(int(currentPage), maxPage):
            yield scrapy.Request(nextPage, callback=self.parse, meta={'maxPage': maxPage})

    def parse_school(self, response):
        school = response.meta['school']

        # school info
        temp = response.xpath(
            "/html/body//div[@class=\'intro\']/text()").extract()
        if len(temp) is not 0:
            school['info'] = temp[0].replace(' ', '')
        else:
            school['info'] = ''

        # print(school['info'])
        for i in response.xpath("/html/body/div[1]/div[10]/div[2]/div[1]/div[2]//li"):
            Type = i.xpath('span/text()').extract()[0]
            Info = i.xpath('div/text()').extract()[0]
            school.baseInfo.append({
                'type': Type,
                'info': Info
            })
        collegePage = response.xpath(
            '/html/body//div[@class=\'wrapper\']/div[@id=\'schoolPage\']/div[1]/div[1]/div[1]/ul/li[7]/a/@href').extract()[0]
        yield scrapy.Request(collegePage, callback=self.parse_college, meta={'school': school})

    def parse_college(self, response):
        school = response.meta['school']
        for collegeItem in response.xpath("/html//div[@id=\"schoolPage\"]//div[@class=\"yuanxiCon\"]/ul/li"):
            college = collegeItem.xpath(
                'a/text()').extract()[0].replace('\r', '').replace('\t', '').replace('\n', '')
            collegeLink = collegeItem.xpath('a/@href').extract()[0]
            yield scrapy.Request(collegeLink, callback=self.parse_professor, meta={
                'school': school,
                'college': college
            })
        yield school

    def parse_professor(self, response):
        school = response.meta['school']
        college = response.meta['college']
        professors = []
        for profItem in response.xpath("//div[@id=\"schoolPage\"]/div[2]/div/div[3]/ul/li"):
            professor = ProfessorItem()
            professor['province'] = school['province']
            professor['name'] = profItem.xpath(
                '@title').extract()[0].replace(college, '')
            professor['college'] = college
            professor['university'] = school['school']
            professors.append(professor['name'])
            yield professor
        school.colleges.append({
            'college': college,
            'professors': professors
        })
