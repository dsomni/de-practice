import styled from "@emotion/styled";

const Wrapper = styled.div`
    text-align: center;
`;

const GlobalInfo: React.FunctionComponent = () => {
    return <Wrapper>
        <h1>Computational Practicum for DE Course </h1>
        <h3>powered by dsomni (d.beresnev@innopolis.university), IU B20-02</h3>
        <hr />
    </Wrapper>
};

export default GlobalInfo;