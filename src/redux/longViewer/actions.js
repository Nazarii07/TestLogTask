import { createAction } from "@reduxjs/toolkit";

export const getDataRequest = createAction("data/getDataRequest");
export const getDataSuccess = createAction("data/getDataSuccess");
export const getDataError = createAction("data/getDataError");

export const sendLogMessage = createAction("SEND_LOG_MESSAGE");