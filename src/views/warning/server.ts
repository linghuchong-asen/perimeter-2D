/*
 * @Description: 告警用到的请求
 * @Version: 1.0
 * @Author: yangsen
 * @Date: 2022-09-08 21:19:02
 * @LastEditors: yangsen
 * @LastEditTime: 2022-10-27 17:19:27
 */

import { http } from "@/utils/http";
import type { RTData } from "./components/realTime/realTime";
import type { HandleWarnData } from "./components/realTime/realTime";
import { SocketServer } from "@/utils/websocket";

// 实时报警websocket连接
/* export const createRealTimeAlarmWs = (param: RTData) => {
  const token = localStorage.getItem("Authorization");
  let baseWs!: string;
  const instance = getGlobalVar();
  if (instance) baseWs = instance.$wsBaseUrl;

  if (token) {
    // 雷达目标告警
    const targetWs = new WebSocket(
      "ws://192.168.0.100:8099" + "/trgt/alarm/trgtalarm/",
      [token]
    );
    targetWs.onopen = () => {
      console.log("目标告警ws链接成功");
    };
    targetWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      Object.assign(param, data);
    };
    targetWs.onclose = (event) => {
      console.log(event.reason);
    };
  }
}; */

export const createRealTimeAlarmWs = (param: RTData) => {
  const cloneObject = {};
  new SocketServer().connect(param, "/trgt/alarm/trgtalarm/");
  Object.assign(param, cloneObject);
};

// IO报警websocket连接
/* export const createIOAlarmWs = (param: RTData) => {
  const token = localStorage.getItem("Authorization");
  let baseWs!: string;
  const instance = getGlobalVar();
  if (instance) baseWs = instance.$wsBaseUrl;

  if (token) {
    const targetWs = new WebSocket(
      "ws://192.168.0.100:8099" + "/ws/IOSwitchAlarm/alarm/",
      [token]
    );
    targetWs.onopen = () => {
      console.log("IO设备告警ws链接成功");
    };
    targetWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      Object.assign(param, data);
    };
    targetWs.onclose = (event) => {
      console.log(event.reason);
    };
  }
}; */

export const createIOAlarmWs = (param: RTData) => {
  new SocketServer().connect(param, "/ws/IOSwitchAlarm/alarm/");
};

// 获取指定防区
export interface AssignDefence {
  alarmarea_group: null;
  alarmarea_group_name: string;
  bypass_end: null;
  bypass_start: null;
  counttime: number;
  delay: number;
  delaytime: number;
  delaytype: number;
  devgroup: string[];
  devgroupobj: string[];
  devid: number;
  devname: string;
  devtype: number;
  event_flag: number;
  func_state: number;
  height: number;
  id: number;
  intervaltime: number;
  is_bypass: boolean;
  is_cover: boolean;
  is_delete: boolean;
  is_failure: boolean;
  is_multitype: boolean;
  is_working: boolean;
  linkarea: null;
  linkcamera: {
    id: number;
    preset: string;
  }[];
  linktype: number;
  logictype: number;
  name: string;
  no: string;
  planned: null;
  planned_name: string;
  region: number;
  shape: Shape;
  touch_eventflag: number;
  tracecamera: number[];
  type: number;
}

export interface Shape {
  coordinates: Array<Array<number[]>>;
  type: string;
}
export const getAssignDefence = (param?: number) =>
  http<AssignDefence | { detail: string }>(
    `/API/V0.1/Area/AlarmArea/${param}/`
  );

/* ----------------实时告警处置--------------------------------- */
export interface HandleWarnSeverData {
  alarmtype: number;
  cfmdesc: string;
  cfmtime: string;
  cfmtype: string;
  id: number;
  obj_id: string;
  type: number;
  user: number;
}
export const handleWarnSever = (params?: HandleWarnData) =>
  http<HandleWarnSeverData | { detail: string }>("/API/V0.1/Area/CfmInfo/", {
    method: "post",
    params,
  });

/* -----------获取处置信息------------- */
export interface DirectionInfoParams {
  startdatetime?: string;
  enddatetime?: string;
  type?: string;
  obj_id?: string;
}
export type DirectionInfoData = {
  id: number;
  cfmtype: string;
  alarmtype: number;
  cfmdesc: string;
  cfmtime: string;
  obj_id: string;
  type: number;
  user: number;
}[];
export const getDirectionInfo = (params?: DirectionInfoParams) =>
  http<DirectionInfoData>("/API/V0.1/Area/CfmInfo/", { params });

/* -------------获取用户信息-------------------- */
export interface Users {
  id: number;
  username: string;
  regions: [];
  roles: [];
}
export const getUsers = (param?: number) =>
  http<Users>(`/API/V0.1/Account/getUserDetail/${param}/`);
