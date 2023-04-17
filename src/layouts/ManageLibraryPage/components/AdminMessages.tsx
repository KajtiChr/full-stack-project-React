import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";
import { stringify } from "querystring";

export const AdminMessages = () =>{

    const { authState } = useOktaAuth();
    //Login pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false);


    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated){
                const url = `${process.env.REACT_APP_API}/messages/secure/closemessages`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const messagesResponse = await fetch(url, requestOptions);
                if(!messagesResponse.ok){
                    throw new Error('Something went wrong');
                }
                const messagesResponseJson = await messagesResponse.json();

                console.log(messagesResponseJson)

                setMessages(messagesResponseJson.content);
                console.log(messagesResponseJson.content)
                setTotalPages(messagesResponseJson.totalPages);

            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
        
    }, [authState, currentPage, btnSubmit])

    if (isLoadingMessages){
        return(
            <SpinnerLoading/>
        );
    }

    if(httpError){
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function submitResponseToQuestion(id: number, response: string){
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if(authState?.isAuthenticated && id !== null && response !== ''){
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };
            console.log(messageAdminRequestModel.id)
            console.log(JSON.stringify(messageAdminRequestModel))
            console.log(messageAdminRequestModel);
            console.log(requestOptions)
            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if(!messageAdminRequestModelResponse.ok){
                throw new Error("Something went wrong");
            }
            setBtnSubmit(!btnSubmit);
        } 
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className="mt-3">
            {messages.length > 0 ? 
                <>
                <h5>Pending Q/A</h5>
                {messages.map(message => (
                    <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion} />
                ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}


        </div>
    );

}