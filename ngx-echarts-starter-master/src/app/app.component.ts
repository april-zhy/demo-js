import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as echarts from 'echarts';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    regionOptions;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get('assets/china.json')
            .subscribe(geoJson => {
                echarts.registerMap('China', geoJson);
                this.regionOptions = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}：{c}'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 50,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['#ADCDEF', '#2171C1']
                        }
                    },
                    series: [
                        {
                            type: 'map',
                            mapType: 'China',
                            itemStyle: {
                                normal: {
                                    areaColor: '#AAD5FF',
                                    borderColor: 'white',
                                    label: { show: true, color: 'white' }
                                },
                                emphasis: {
                                    areaColor: '#A5DABB'
                                }
                            },
                            zoom: 1.2,
                            data: [
                                { name: '北京', value: 0 },
                                { name: '天津', value: 0 },
                                { name: '重庆', value: 0 },
                                { name: '上海', value: 0 },
                                { name: '湖南', value: 0 },
                                { name: '广东', value: 20 },
                                { name: '福建', value: 0 },
                                { name: '江西', value: 0 },
                                { name: '四川', value: 0 },
                                { name: '广西', value: 0 },
                                { name: '新疆', value: 0 },
                                { name: '西藏', value: 0 },
                                { name: '青海', value: 0 },
                                { name: '甘肃', value: 0 },
                                { name: '宁夏', value: 0 },
                                { name: '内蒙古', value: 0 },
                                { name: '海南', value: 0 },
                                { name: '山西', value: 0 },
                                { name: '陕西', value: 0 },
                                { name: '云南', value: 0 },
                                { name: '贵州', value: 0 },
                                { name: '湖北', value: 0 },
                                { name: '浙江', value: 0 },
                                { name: '安徽', value: 0 },
                                { name: '河南', value: 0 },
                                { name: '山东', value: 0 },
                                { name: '江苏', value: 0 },
                                { name: '河北', value: 0 },
                                { name: '辽宁', value: 0 },
                                { name: '吉林', value: 0 },
                                { name: '黑龙江', value: 0 },
                                { name: '台湾', value: 0 }]
                        }
                    ]
                };
            });
    }
}
