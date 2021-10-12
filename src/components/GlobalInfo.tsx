import styled from "@emotion/styled";

const Wrapper = styled.div`
    text-align: center;
`;

const FormulaWrapper = styled.h2`
    text-align: center;
    border: black 2px solid;
    padding: 7px;
    width: 12rem;
    margin: 5px auto;
`;

const GlobalInfo: React.FunctionComponent = () => {
    return <Wrapper>
        <h1>Computational Practicum for DE Course </h1>
        <h3>powered by dsomni (d.beresnev@innopolis.university), IU B20-02</h3>
        <hr />
        <FormulaWrapper>y' = y/x - y - x</FormulaWrapper>
    </Wrapper>
};

export default GlobalInfo;