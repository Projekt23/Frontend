/*------------------------------------------------------------Necessary imports------------------------------------------------------------------------------------------------*/
import React from 'react'
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";
import { Container } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";


/*------------------------------------------------------------Styles of UserDropDownSettings------------------------------------------------------------------------------------*/


export const SearchResult = (props) => {
    const navigate = useNavigate()
    const redirect = (e, id) => {
        e.preventDefault();
        navigate("/results/" + id);
    }
    return (
            <div>
                <Container>
                    <ReactiveList
                        componentId="SearchResult"
                        dataField="name"
                        size={10}
                        showResultStats={false}
                        pagination={true}
                        paginationAt="bottom"
                        react={{
                            and: "q"
                        }}
                        render={({ data }) => (
                            <ReactiveList.ResultListWrapper>
                                {console.log(data)}
                                {data.map(item => (
                                    <ResultList key={item._id} href="#" target="_self" onClick={(e) => { redirect(e, item._id) }}>
                                        <ResultList.Content>
                                            <ResultList.Title >
                                                    <div
                                                        className="result_title title-font"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.name,
                                                        }}
                                                    />
                                            </ResultList.Title>
                                            <ResultList.Description>
                                            </ResultList.Description>
                                        </ResultList.Content>
                                    </ResultList>
                                ))}
                            </ReactiveList.ResultListWrapper>
                        )}
                    />
                </Container>
            </div>
     
    );
}