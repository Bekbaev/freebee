import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import DrawIndex from './components/v2/Draws/DrawIndex';
import Clients from './components/Clients/Clients'
import ClientsCreate from './components/Clients/ClientsCreate'
import ClientsView from './components/Clients/ClientsView'
import CompanyEdit from './components/Company/CompanyEdit'
import CompanyFullInfo from './components/Company/CompanyFullInfo'
import OtherCondition from './components/Conditions/OtherCondition'
import PublicCondition from './components/Conditions/PublicCondition'
import MainDraw from './components/Draw/MainDraw'
import WeeklyDraw from './components/Draw/WeeklyDraw'
import Header from './components/Header'
import Main from './components/Main/Main'
import Manager from './components/Manager/Manager'
import ManagerCreate from './components/Manager/managerCreate'
import ManagerCreateCompany from './components/Manager/managerCreateCompany'
import ManagerView from './components/Manager/ManagerView'
import NotAuthorizedHeader from './components/NotAuthorizedHeader'
import Accrual from './components/Payments/Accrual'
import Writeoff from './components/Payments/Writeoff'
import Push from './components/Push/Push'
import BalanceRules from './components/Rules/BalanceRules'
import CompetitionRules from './components/Rules/CompetitionRules'
import DrawRules from './components/Rules/DrawRules'
import ReferenceRules from './components/Rules/ReferenceRules'
import TicketsCreate from './components/Tickets/Tickets-create'
import TicketsList from './components/Tickets/Tickets-list'
import TicketsStory from './components/Tickets/TicketsStory'
import TicketsStoryList from './components/Tickets/TicketsStoryList'
import TicketsUnactivated from './components/Tickets/TicketsUnactivated'
import TicketsUpdate from './components/Tickets/TicketsUpdate'
import Transaction from './components/Transaction/Transaction'
import TransactionAll from './components/Transaction/TransactionAll'
import TransactionCheck from './components/Transaction/TransactionCheck'
import UserCreate from './components/Users/UserCreate'
import Users from './components/Users/Users'
import UserView from './components/Users/UserView'
import getRole from './getRole'
import Balance from './pages/Balance'
import Edit from './pages/Edit'
import Events from './pages/Events'
import Login from './pages/Login'
import PasswordResetRequest from './pages/Password-reset-request'
import ManagerUpdate from "./components/Manager/ManagerUpdate";
import DrumDraw from "./components/Draw/DrumDraw";
import TicketsPrint from "./components/Tickets/TicketsPrint";
import DrawTable from "./components/Draw/DrawTable";
import Drum from "./components/Drum";
import './css/animate.min.css'
import MassCheck from "./components/Transaction/MassCheck";
import TransactionHist from "./components/Transaction/TransactionHist";
import TransactionCollections from "./components/Transaction/TransactionCollections";
import Collections from "./components/Transaction/Collections";
import ClientUpdate from "./components/Clients/ClientUpdate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DrawCreate from "./components/v2/Draws/DrawCreate";
import DrawDrum from "./components/v2/Draws/DrawDrum";
import DrawSteps from "./components/v2/Draws/DrawSteps";
import ReferralRules from "./components/Rules/ReferralRules";
import ReferalList from "./components/Referal/ReferalList";
import WalletIndex from "./components/Wallet/WalletIndex";
import WalletAdd from "./components/Wallet/WalletAdd";
import WalletInfo from "./components/Wallet/WalletInfo";
import CompanyPromocodeList from "./components/CompanyPromocodes/CompanyPromocodeList";
import CompanyPromocodeCreate from "./components/CompanyPromocodes/CompanyPromocodeCreate";
import getCompanyId from "./getCompanyId";


const role = getRole()


function App() {
    const tokens = localStorage.access_token && localStorage.refresh_token
    const [routes, setRoutes] = useState(null)

    useEffect(() => {
        switch (role) {
            case 'god':
                setRoutes(
                    <>
                        <Route path="/" component={Main} exact />
                        <Route path="/promocode/list" component={CompanyPromocodeList} exact />
                        <Route path="/promocode/create" component={CompanyPromocodeCreate} exact />
                        <Route path="/ref/list" component={ReferalList} exact />
                        <Route path="/ticketsCreate" component={TicketsCreate} exact />
                        <Route path="/ticketsList" component={TicketsList} exact />
                        <Route path="/edit" component={Edit} exact />
                        <Route path="/balance" component={Balance} exact />
                        <Route path="/events" component={Events} exact />
                        <Route path="/manager" component={Manager} exact />
                        <Route path="/managerCreate" component={ManagerCreate} exact />
                        <Route path="/managerView/:id?" render={({ match }) => <ManagerView match={match} />} exact />
                        <Route path="/managerUpdate/:id?" render={({ match }) => <ManagerUpdate match={match} />} exact />
                        <Route path="/clients" component={Clients} exact />
                        <Route path="/clientsCreate" component={ClientsCreate} exact />
                        <Route path="/clientsView/:id?" render={({ match }) => <ClientsView match={match} />} exact />
                        <Route path="/clientUpdate/:id?" render={({ match }) => <ClientUpdate match={match} />} exact />
                        <Route
                            path="/companyStats/:id?"
                            render={({ match }) => <CompanyFullInfo match={match} />}
                            exact
                        />
                        <Route path="/companyEdit/:id?" render={({ match }) => <CompanyEdit match={match} />} exact />
                        <Route path="/users/" render={({ match }) => <Users match={match} />} exact />
                        <Route path="/userCreate" component={UserCreate} exact />
                        <Route path="/push" component={Push} exact />
                        <Route path="/transactionAll" component={TransactionAll} exact />
                        <Route path="/transactionHist" component={TransactionHist} exact />
                        <Route path="/ticketsUnactivated" component={TicketsUnactivated} exact />
                        <Route path="/transaction" component={Transaction} exact />
                        <Route path="/userView/:id?" render={({ match }) => <UserView match={match} />} exact />
                        <Route path="/userView/:id?" render={({ match }) => <UserView match={match} />} exact />
                        <Route path="/userView/:id?" render={({ match }) => <UserView match={match} />} exact />
                        <Route path="/ticketsStory" render={({ match }) => <TicketsStory match={match} />} exact />
                        <Route
                            path="/ticketsUpdate/:id?"
                            render={({ match }) => <TicketsUpdate match={match} />}
                            exact
                        />
                        <Route path="/massCheck" component={MassCheck} exact />
                        <Route path="/writeoff" component={Writeoff} exact />
                        <Route path="/competitionRules" component={CompetitionRules} exact />
                        <Route path="/drawRules" component={DrawRules} exact />
                        <Route path="/referenceRules" component={ReferenceRules} exact />
                        <Route path="/balanceRules" component={BalanceRules} exact />
                        <Route path="/referralRules" component={ReferralRules} exact />
                        <Route path="/accrual" component={Accrual} exact />
                        <Route path="/draw/week" render={() => <DrawIndex type={0}/>} exact />
                        <Route path="/draw/main" render={() => <DrawIndex type={1}/>} exact />
                        <Route path="/draw/create/:type?" component={DrawCreate} exact />
                        <Route
                            path="/draw/drum/:id?/:type?"
                            render={({ match }) => <DrawDrum />}
                            exact
                        />
                        <Route
                            path="/draw/table/:id?/:type?"
                            render={({ match }) => <DrawTable />}
                            exact
                        />
                        <Route
                            path="/draw/step/:id?/:type?"
                            exact
                            render={({ match }) => <DrawSteps />}
                        />
                       {/* <Route path="/draw/week" render={() => <WeeklyDraw />} exact />
                        <Route path="/draw/main" render={() => <MainDraw />} exact />*/}
                        <Route
                            path="/transactionCheck/:id?"
                            render={({ match }) => <TransactionCheck match={match} />}
                            exact
                        />
                        <Route
                            path="/ticketStoryList/:key?"
                            render={({ match }) => <TicketsStoryList match={match} />}
                            exact
                        />
                        <Route
                            path="/collections/:id?"
                            render={({ match }) => <Collections match={match} />}
                            exact
                        />
                        <Route path="/condition/public" render={() => <PublicCondition />} exact />
                        <Route path="/condition/other" render={() => <OtherCondition />} exact />
                        <Route path="/transactionCollections" component={TransactionCollections} exact />
                        <Route path="/wallet/index" component={WalletIndex} exact />
                        <Route path="/wallet/add" component={WalletAdd} exact />
                        <Route path="/wallet/info/:id" component={WalletInfo} exact />
                    </>
                )
                break
            case 'accountant':
                setRoutes(
                    <>

                        <Route path="/" component={TransactionAll} exact />
                        <Route path="/ref/list" component={ReferalList} exact />


{/*
                        <Route path="/transactionAll" component={TransactionAll} exact />
*/}

                        <Route path="/transactionHist" component={TransactionHist} exact />
                        <Route path="/transactionCollections" component={TransactionCollections} exact />
                        <Route
                            path="/collections/:id?"
                            render={({ match }) => <Collections match={match} />}
                            exact
                        />
                        <Route
                            path="/transactionCheck/:id?"
                            render={({ match }) => <TransactionCheck match={match} />}
                            exact
                        />
                        <Route path="/massCheck" component={MassCheck} exact />
                        <Route path="/wallet/index" component={WalletIndex} exact />
                        <Route path="/wallet/add" component={WalletAdd} exact />
                        <Route path="/wallet/info/:id" component={WalletInfo} exact />
                    </>
                )
                break
            case 'company':
                setRoutes(
                    <>
                        <Route path="/" component={TransactionAll} exact />
                        <Route path="/promocode/list" component={CompanyPromocodeList} exact />
                        <Route path="/promocode/create" component={CompanyPromocodeCreate} exact />
                        <Route path={`/wallet/info`} component={WalletInfo} exact />
                        <Route path="/accrual" component={Accrual} exact />
                        <Route path="/transactionAll"  component={<TransactionAll company={true} />} exact />
                        <Route path="/manager" component={Manager} exact />
                        <Route path="/managerCreate" component={ManagerCreateCompany} exact />
                        <Route path="/clients" component={Clients} exact />
                        <Route path="/managerView/:id?" render={({ match }) => <ManagerView match={match} />} exact />
                        <Route path="/managerUpdate/:id?" render={({ match }) => <ManagerUpdate match={match} />} exact />
                        <Route path="/clientsCreate" render={() => <ClientsCreate redirectToHome />} exact />
                        <Route path="/clientsView/:id?" render={({ match }) => <ClientsView match={match} />} exact />
                        <Route path="/writeoff" component={Writeoff} exact />
                        <Route path="/ticketsCreate" render={() => <TicketsCreate isCompany />} exact />
                        <Route path="/ticketsList" render={() => <TicketsList isCompany />} exact />
                        <Route path="/ticketsUnactivated" component={TicketsUnactivated} exact />
                        <Route path="/draw/week" render={() => <DrawIndex type={0}/>} exact />
                        <Route path="/draw/main" render={() => <DrawIndex type={1}/>} exact />
                        <Route path="/draw/create/:type?" component={DrawCreate} exact />
                        <Route
                            path="/draw/drum/:id?/:type?"
                            render={({ match }) => <DrawDrum />}
                            exact
                        />
                        <Route
                            path="/draw/table/:id?/:type?"
                            render={({ match }) => <DrawTable />}
                            exact
                        />
                        <Route
                            path="/draw/step/:id?/:type?"
                            exact
                            render={({ match }) => <DrawSteps />}
                        />
                        {/*<Route path="/draw/week" render={() => <WeeklyDraw isCompany />} exact />
                        <Route path="/draw/main" render={() => <MainDraw isCompany />} exact />*/}
                       {/* <Route
                            path="/drumDraw/:id?/:type?"
                            render={({ match }) => <DrumDraw match={match} />}
                            exact
                        />
                        <Route
                            path="/DrawTable/:id?/:type?"
                            render={({ match }) => <DrawTable match={match} />}
                            exact
                        />*/}
                        <Route path="/drum" render={() => <Drum />} exact />
                        <Route
                            path="/ticketsUpdate/:id?"
                            render={({ match }) => <TicketsUpdate match={match} />}
                            exact
                            />
                        <Route path="/ticketsStory" render={({ match }) => <TicketsStory match={match} />} exact />
                        <Route path="/DrawTable" render={({ match }) => <DrawTable match={match} />} exact />
                        <Route
                            path="/ticketStoryList/:key?"
                            render={({ match }) => <TicketsStoryList match={match} />}
                            exact
                        />
                        <Route path="/clientUpdate/:id?" render={({ match }) => <ClientUpdate match={match} />} exact />
                        <Route path="/companyEdit/:id?" render={({ match }) => <CompanyEdit match={match} />} exact />
                    </>
                )
                break
            case 'partner':
                setRoutes(
                    <>
                        <Route path="/" render={() => <TransactionAll />} exact />
                        <Route path="/clients" render={() => <Clients noCreate />} exact />
                        <Route path="/manager" component={Manager} exact />
                        <Route path="/managerCreate" component={ManagerCreateCompany} exact />
                        <Route path="/managerView/:id?" render={({ match }) => <ManagerView match={match} />} exact />
                        <Route path="/managerUpdate/:id?" render={({ match }) => <ManagerUpdate match={match} />} exact />
                        <Route path="/writeoff" component={Writeoff} exact />
                        <Route path="/ticketsList" component={TicketsList} exact />
                        <Route path="/companyEdit/:id?" render={({ match }) => <CompanyEdit match={match} />} exact />
                    </>
                )
                break
            case 'employee':
                setRoutes(
                    <>
                        {/*<Route path="/" render={() => <Clients noCreate />} exact />*/}
                        <Route path="/" component={Writeoff} exact />
                        <Route path="/writeoff" component={Writeoff} exact />
                        <Route path="/accrual" component={Accrual} exact />
                        <Route path="/transactionAll" company={true} component={TransactionAll} exact />
                        <Route path="/clients" component={Clients} exact />
                        <Route path="/clientsCreate" render={() => <ClientsCreate redirectToHome />} exact />
                        <Route path="/clientsView/:id?" render={({ match }) => <ClientsView match={match} />} exact />
                        <Route path="/clientUpdate/:id?" render={({ match }) => <ClientUpdate match={match} />} exact />
                    </>
                )
                break
            default:
                setRoutes(null)
        }
    }, [])

    return (
        <div className="App">
            <Route
                path="/ticketsPrint/:key?"
                render={({ match }) => <TicketsPrint match={match} />}
                exact
            />

            <div className="wrap">
                {!tokens ? (
                    <>
                        <NotAuthorizedHeader />
                        <div className="container">
                            <Route path="/" component={Login} exact />
                            <Route path="/login" component={Login} exact />
                            <Route path="/passwordResetRequest" component={PasswordResetRequest} exact />
                        </div>
                    </>
                ) : (
                    <>
                        <Route path="/:url?" render={({ match }) => <Header match={match} />} />
                        <div className="container">{routes}</div>

                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

const toLogin = () => {
    return (
        <div>
            <Link to="/login/">Логин</Link>
        </div>
    )
}

export default App
