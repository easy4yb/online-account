import React, {FC, Suspense} from 'react';
import {Layout, Menu, Statistic, Spin} from 'antd';
import {Icon} from '../icon/Icon';
import { renderRoutes } from 'react-router-config';
import { ROUTER_CONFIG } from '../../services/router';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo/Logo'
import './MainLayout.css';
import LocaleDatePicker from '../localDatePicker/LocalDatePicker';
import { useContext } from 'react';
import { getSummary } from '../../services/recordHelpler';
import { updateMonth } from '../provider/reducer/action';
import { Context } from '../provider/Provider';
import { Moment } from 'moment';
import AnimateNumber from '../animateNumber/AnimateNumber';

const {Sider, Content} = Layout;
const {Item} = Menu;

const MainLayout: FC = () => {
    const {state, dispatch} = useContext(Context);

    const monthlySummary = getSummary(state.monthlyRecords);

    const onMonthChange = (month: Moment) => {
        dispatch(updateMonth(month))
    } 

    //获取当前页面的path
    const {pathname} = useLocation();
    return (
        <Layout className = "app" hasSider = {true}>
            <Sider className = "sider" theme = "light" collapsible>
                <Logo />
                <Menu defaultSelectedKeys = {[pathname]}>
                    <Item key = "detail" icon = {<Icon icon = {'icon-zhuye'}/>}>
                        <Link to = "/">
                            明细
                        </Link>
                    </Item>
                    <Item key = "chart" icon = {<Icon icon = {'icon-Chart'}/>}>
                        <Link to = "/chart">
                            图表
                        </Link>
                    </Item>
                </Menu>
            </Sider>
            <Content className = "content">
                <div className = "header">
                    <Logo size = {'large'} />
                    <div className = "header-category">
                        <Statistic 
                            title = "请选择月份"
                            valueRender = {() => <LocaleDatePicker value = {state.month} onChange = {onMonthChange}/>}
                        />
                        <Statistic 
                            title = "总收入" 
                            prefix = '¥' 
                            valueRender = {() => <AnimateNumber num = {monthlySummary.totalIncome}/>}
                        />
                        <Statistic 
                            title = "总支出" 
                            prefix = '¥' 
                            valueRender = {() => <AnimateNumber num = {monthlySummary.totalExpenditure}/>}
                        />
                    </div>
                </div> 
                <div className = "body">
                    <Suspense fallback = {<Spin />}>
                        {renderRoutes(ROUTER_CONFIG)}
                    </Suspense>
                </div>
            </Content>
        </Layout>
    )
}

export default MainLayout;