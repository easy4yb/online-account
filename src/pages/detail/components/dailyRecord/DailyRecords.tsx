import React, {FC} from "react";
import { GroupedDailyRecords } from "../../../../services/recordHelpler";
import { DateFormat, formatTimeStamp } from "../../../../services/dateHelper";
import Record from '../record/Record'
import './DailyRecords.css';

interface DailyRecordsProps extends GroupedDailyRecords {
    onOpenUpdateModal: (_id: string) => void
    onDeleteRecord: (_id: string) => void
}

const DailyRecords: FC<DailyRecordsProps> = ({records, summary, timeStamp, onOpenUpdateModal, onDeleteRecord}) =>{
    return(
        <div className = "daily-records">
            <div className = "daily-records-summary">
                <div className = "daily-records-date">
                    {formatTimeStamp(timeStamp, DateFormat.MONTH_DATEOFWEEK)}
                </div>
                {summary.totalExpenditure > 0 && (
                    <div className = "daily-records-detail">
                        支出：-{summary.totalExpenditure}
                    </div>
                )}
                {summary.totalIncome > 0 && (
                    <div className = "daily-records-detail">
                        收入：+{summary.totalIncome}
                    </div>
                )}
            </div>
            <div className = "records">
                {records.map(record => (
                    <Record 
                        key = {record._id} 
                        {...record} 
                        onOpenUpdateModal = {onOpenUpdateModal} 
                        onDeleteRecord = {onDeleteRecord}
                    />
                ))}
            </div>
        </div>
    )
}

export default DailyRecords;