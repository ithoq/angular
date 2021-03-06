angular.module('app')
    // Chart controller 
    .controller('Dashboard2Ctrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        // $scope.errorShowCard = true;
        // $scope.errorShowList = false;
        // $scope.showList = function(){
        //     $scope.errorShowCard = false;
        //     $scope.errorShowList = true;
        // };
        // $scope.hideList = function(){
        //     $scope.errorShowCard = true;
        //     $scope.errorShowList = false;
        // };
        $scope.shrink1 = '收起';
        $scope.shrink2 = '收起';
        $scope.shrink3 = '收起';
        $scope.shrink4 = '收起';
        $scope.toggle = function(shrink,n){
            if(n==1){
                if(shrink=='收起'){
                    $scope.shrink1 = '更多';
                }else{
                    $scope.shrink1 = '收起';
                }
            }if(n==2){
                if(shrink=='收起'){
                    $scope.shrink2 = '更多';
                }else{
                    $scope.shrink2 = '收起';
                }
            }if(n==3){
                if(shrink=='收起'){
                    $scope.shrink3 = '更多';
                }else{
                    $scope.shrink3 = '收起';
                }
            }if(n==4){
                if(shrink=='收起'){
                    $scope.shrink4 = '更多';
                }else{
                    $scope.shrink4 = '收起';
                }
            }
        };
    	var pannel1 = echarts.init(document.getElementById('mainPannel'));
        var pannel2 = echarts.init(document.getElementById('barPannel'));
    	var option1 = {
            title: {
                text: '资源'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y:40,
                data: []
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: []
            }, {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '55%'],

                data: []
            }]
        };
        var option2 = {
            color: ['#3398DB'],
            title: {
                text: '事件发生类型Top5排名'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['磁盘利用率', '设备状态', '设备响应时间', 'CPU利用率', '内存利用率'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'事件',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 25, 50, 75, 90]
                }
            ]
        };

    	
        // 告警数据列表
        $http({
            method: "POST",
            url: "/abc/index/dashboardAlarmServlet"
          }).
          success(function(data, status) {
            if(data.status!=200){
                console.info(data.status);
                $scope.errorHide = true;
                $scope.warnHide = true;
                $scope.urgentHide = true;
                $scope.seriousHide = true;
            }else{
                $scope.errorHide = data.data.errorData.errorNum===0?true:false;
                $scope.warnHide = data.data.warnData.warnNum===0?true:false;
                $scope.urgentHide = data.data.urgentData.urgentNum===0?true:false;
                $scope.seriousHide = data.data.seriousData.seriousNum===0?true:false;

                $scope.errorNum = data.data.errorData.errorNum>99?'99+':data.data.errorData.errorNum;
                $scope.warnNum = data.data.warnData.warnNum>99?'99+':data.data.warnData.warnNum;
                $scope.urgentNum = data.data.urgentData.urgentNum>99?'99+':data.data.urgentData.urgentNum;
                $scope.seriousNum = data.data.seriousData.seriousNum>99?'99+':data.data.seriousData.seriousNum;

                $scope.errorList = data.data.errorData.errorList;
                $scope.warnList = data.data.warnData.warnList;
                $scope.urgentList = data.data.urgentData.urgentList;
                $scope.seriousList = data.data.seriousData.seriousList;
            }
          }).
          error(function(data, status) {
            console.error(status);
            $scope.errorHide = true;
            $scope.warnHide = true;
            $scope.urgentHide = true;
            $scope.seriousHide = true;
         });
        // 饼状图
        $http({
            method: "POST",
            url: "/nms/assets/js/api/pie.json"
          }).
          success(function(data, status) {
            if(data.status!=200){
                console.info(data.status);
            }else{
                option1.legend.data = data.data.legend;
                option1.series[0].data = data.data.level1;
                option1.series[1].data = data.data.level2;
                pannel1.setOption(option1);
            }
          }).
          error(function(data, status) {
            console.error(status);
         });
        // 条形图
        $http({
          method: "POST",
          url: "/nms/assets/js/api/pie.json"
        }).
        success(function(data, status) {
          if(data.status!=200){
              console.info(data.status);
          }else{
              option2.xAxis.data = data.data.xAxis;
              option2.series.data = data.data.series;
              pannel2.setOption(option2);
          }
        }).
        error(function(data, status) {
          console.error(status);
       });
        
    }]);
