import DashboardContext from "pages/Dashboard/context";
import UserSessionContext from "./UserSessionContext";
import UserContext from "pages/Users/context";
import CompanieContext from "pages/Companies/context";
import EvaluationContext from "pages/Evaluations/context";
import SupportContext from "pages/Support/context";
import SearchLogsContext from "pages/SearchLogs/context";
import SolicitacoesNovoServicoContext from "pages/SolicitacoesNovoServico/context";

export const StoreProvider = ({ children }) => {
    return (
        <UserSessionContext>
            <DashboardContext>
                <UserContext>
                    <CompanieContext>
                        <EvaluationContext>
                            <SupportContext>
                                <SearchLogsContext>
                                    <SolicitacoesNovoServicoContext>
                                        {children}
                                    </SolicitacoesNovoServicoContext>
                                </SearchLogsContext>
                            </SupportContext>
                        </EvaluationContext>
                    </CompanieContext>
                </UserContext>
            </DashboardContext>
        </UserSessionContext>
    );
};