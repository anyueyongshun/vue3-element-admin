import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  NoticeQuery,
  NoticeModel,
  NoticeAddModel,
  NoticeEditModel,
  NoticeUpdatePublishStatusModel,
  NoticeUpdateStatusModel,
} from "./model";

//通知分页查询
export function getNoticePage(queryParams: NoticeQuery) {
  return request<any, PageResult<NoticeModel[]>>({
    url: "/notice/PageList",
    method: "get",
    params: queryParams,
  });
}

//通知分页查询--我收到的通知
export function getNoticePageMyReceive(queryParams: NoticeQuery) {
  return request<any, PageResult<NoticeModel[]>>({
    url: "/notice/PageListMyReceive",
    method: "get",
    params: queryParams,
  });
}

//通知分页查询--我发布的通知
export function getNoticePageMyPublish(queryParams: NoticeQuery) {
  return request<any, PageResult<NoticeModel[]>>({
    url: "/notice/PageListMyPublish",
    method: "get",
    params: queryParams,
  });
}

//新增通知
export function addNotice(data: NoticeAddModel): AxiosPromise<boolean> {
  return request({
    url: "/Notice/add",
    method: "post",
    data: data,
  });
}

//编辑通知
export function editNotice(data: NoticeEditModel): AxiosPromise<boolean> {
  return request({
    url: "/Notice/update",
    method: "post",
    data: data,
  });
}

//更新通知发布状态
export function updatePublishStatus(
  data: NoticeUpdatePublishStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/Notice/UpdatePublishStatus",
    method: "post",
    data: data,
  });
}

//更新通知状态
export function updateStatus(
  data: NoticeUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/Notice/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取通知明细
export function getDetail(id: string) {
  return request<any, NoticeModel>({
    url: "/Notice/GetById?id=" + id,
    method: "get",
  });
}

//查看通知明细
export function viewNotice(id: string) {
  return request<any, NoticeModel>({
    url: "/Notice/ViewNotice?id=" + id,
    method: "get",
  });
}
