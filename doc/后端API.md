## 后端接口

---

* 获取某省份大学

  向server发送一个**get request**，url: **/query/province/${province_name}**

  ```json
  response.body格式：
  [{
      "name":string,//学校名
  },
   ...
  ]
  ```

  

* 依据大学与名字搜索professor
  向server发送一个**post request**，url: **/query/professor**，

  ```json
  request.body格式:
  {
      "prof_name":string,
      "university":name
  }
  ```

  ```json
  response.body格式：
  [{
      "id":int,
      "name":string,
      "university":string,
      "college":stng
  },
   ...
  ]
  ```

* 获取某一professor页面

  向server发送一个**get request**，url: **/query/professor/${professor_id}**

  ```json
  response.body格式：
  {
      "id":int,
      "name":string,
      "university":string,
      "college":string,
      "score":float,//学生平均评分
      "studentNums":int,
      "callRate":float,//点名率
      "comments":[
          {
              "content":string,
              "score":int,
      		"date": Date,
              "score":int,
              "callOrNot": boolean|null//是否点名
          }
      ]
  }
  ```

* 对某一professor进行评论

  向server发送一个**post request**，url: **/comment**，

  ```json
  request.body格式:
  {
      "prof_id":int,
      "content":string | null,
      "score":int,//1~10，不可为空
      "date": Date,//若content非空，则此条也非空
      "callOrNot": boolean|null
  }
  ```

  