<template>
  <div class="allMains">
    <el-row>
      <!--基础信息模块-->
      <el-col :span="24">
        <p class="title">
          基础信息
        </p>
      </el-col>
      <div style="width: 80%;margin: auto;">
        <el-col :span="6" v-for="(i,index) in infos">
          <div class="infos">
            <div class="number">{{i.number}}</div>
            <span class="info">{{i.info}}</span>
          </div>
        </el-col>
      </div>
      <!--数据排行模块-->
      <el-col :span="24">
        <p class="title">
          数据排行
        </p>
      </el-col>
      <div>
        <el-col :span="8" v-for="(i,index) in dataRank">
          <div class="data_rank">
            <div style="width:100%; height:400px;">
              <Echarts :option="i"></Echarts>
              <!--              <echarts :option="dataRank[1]"></echarts>-->
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import Echarts from "../../components/echarts";

  export default {
    name: "index",
    components: {Echarts},
    data() {
      return {
        infos: [
          {number: 55, info: '当前在线设备数量'},
          {number: 0, info: '当前在线账户数量'},
          {number: 55, info: '总计视频数量'},
          {number: 0, info: '总计粉丝数量'},
          {number: 0, info: '总计评论数量'},
          {number: 55, info: '总计点赞数量'},
          {number: 0, info: '总计播放数量'},
          {number: 55, info: '待定'},
        ],
        dataRank: [
          {
            title: {
              text: '粉丝数排行'
            },
            legend: {
              orient: 'vertical',
              bottom: 10,
              // data: ['销量']
            },
            xAxis: {},
            yAxis: {
              data: ['A账号', 'B账号', 'C账号', 'D账号', 'E账号', 'F账号', 'G账号',],
            },
            series: [
              {
                // barWidth: '20%',
                barGap: '20%',
                barCategoryGap: '60%',
                // name: '销量',
                type: 'bar',
                data: [
                  {value: 300, itemStyle: {color: '#5c5e6d'}},
                  {value: 500, itemStyle: {color: '#6ad4d4'}},
                  {value: 800, itemStyle: {color: '#8757ed'}},
                  {value: 1000, itemStyle: {color: '#ffcf26'}},
                  {value: 3000, itemStyle: {color: '#6ad49b'}},
                  {value: 5000, itemStyle: {color: '#f35d82'}},
                  {value: 9500, itemStyle: {color: '#5ba6ff'}},
                ],
              },
            ],
          },
          {
            title: {
              text: '作品播放排行'
            },
            legend: {
              orient: 'vertical',
              bottom: 10,
              // data: ['销量']
            },
            xAxis: {},
            yAxis: {
              data: [' ', ' ', ' ', ' ', ' ', ' ', ' ',],
            },
            series: [
              {
                // barWidth: '20%',
                barGap: '20%',
                barCategoryGap: '60%',
                // name: '销量',
                type: 'bar',
                data: [
                  {value: 300, itemStyle: {color: '#5c5e6d'}},
                  {value: 500, itemStyle: {color: '#6ad4d4'}},
                  {value: 800, itemStyle: {color: '#8757ed'}},
                  {value: 1000, itemStyle: {color: '#ffcf26'}},
                  {value: 3000, itemStyle: {color: '#6ad49b'}},
                  {value: 5000, itemStyle: {color: '#f35d82'}},
                  {value: 9500, itemStyle: {color: '#5ba6ff'}},
                ],
              },
            ],
          },
          {
            title: {
              text: '作品点赞排行'
            },
            legend: {
              orient: 'vertical',
              bottom: 10,
              // data: ['销量']
            },
            xAxis: {},
            yAxis: {
              data: ['', ' ', ' ', ' ', ' ', ' ', '',]
            },
            series: [
              {
                // barWidth: '20%',
                barGap: '20%',
                barCategoryGap: '60%',
                // name: '销量',
                type: 'bar',
                data: [
                  {value: 300, itemStyle: {color: '#5c5e6d'}},
                  {value: 500, itemStyle: {color: '#6ad4d4'}},
                  {value: 800, itemStyle: {color: '#8757ed'}},
                  {value: 1000, itemStyle: {color: '#ffcf26'}},
                  {value: 3000, itemStyle: {color: '#6ad49b'}},
                  {value: 5000, itemStyle: {color: '#f35d82'}},
                  {value: 9500, itemStyle: {color: '#5ba6ff'}},
                ],
              },
            ],
          },
          {
            title: {
              text: '作品评论排行'
            },
            legend: {
              orient: 'vertical',
              bottom: 10,
              // data: ['销量']
            },
            xAxis: {},
            yAxis: {
              data: ['视频编号', '视频编号', '视频编号', '视频编号', '视频编号', '视频编号', '视频编号']
            },
            series: [
              {
                // barWidth: '20%',
                barGap: '20%',
                barCategoryGap: '60%',
                // name: '销量',
                type: 'bar',
                data: [
                  {value: 300, itemStyle: {color: '#5c5e6d'}},
                  {value: 500, itemStyle: {color: '#6ad4d4'}},
                  {value: 800, itemStyle: {color: '#8757ed'}},
                  {value: 1000, itemStyle: {color: '#ffcf26'}},
                  {value: 3000, itemStyle: {color: '#6ad49b'}},
                  {value: 5000, itemStyle: {color: '#f35d82'}},
                  {value: 9500, itemStyle: {color: '#5ba6ff'}},
                ],
              },
            ],
          },
        ],
        // echarts 数据模型
        option: {
          title: {
            text: '粉丝数排行'
          },
          legend: {
            orient: 'vertical',
            bottom: 10,
            // data: ['销量']
          },
          xAxis: {},
          yAxis: {
            data: ['视频编号', '视频编号', '视频编号', '视频编号', '视频编号', '视频编号']
          },
          series: [
            {
              // barWidth: '20%',
              barGap: '20%',
              barCategoryGap: '60%',
              // name: '销量',
              type: 'bar',
              data: [
                {value: 43, itemStyle: {color: '#5ba6ff'}},
                {value: 43, itemStyle: {color: '#f35d82'}},
                {value: 43, itemStyle: {color: '#6ad49b'}},
                {value: 43, itemStyle: {color: '#ffcf26'}},
                {value: 43, itemStyle: {color: '#8757ed'}},
                {value: 43, itemStyle: {color: '#6ad4d4'}},
                {value: 43, itemStyle: {color: '#5c5e6d'}},
              ],
            }
          ],
        },
        y_axisData: ['视频编号', '视频编号', '视频编号', '视频编号', '视频编号', '视频编号', '视频编号'],
      }
    },
    mounted() {

    },
    methods: {},
  }

</script>

<style lang="less" scoped>
  .title {
    font-weight: 700;
    font-size: 24px;
  }

  /*信息模块*/
  .infos {
    width: 70%;
    text-align: center;
    background-color: #fff;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 35px;
    padding-bottom: 15px;

    .number {
      font-size: 28px;
      font-weight: 700;
      padding: 20px 0;
    }

    .info {
      font-weight: 400;
      font-style: normal;
      font-size: 13px;
      color: #AAAAAA;
    }
  }

  /*  数据模块*/
  .data_rank {
    margin: 35px;
    padding: 32px 20px;
    background-color: #fff;
  }
</style>
