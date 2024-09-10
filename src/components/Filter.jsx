import styled from "styled-components";

//using this as a reusable component instead of writing out the return code multiple times
//this component can be reused everywhere as long as it is imported and the needed props are passed to it
const Filter = ({
    filter,
    handleFilterChange,
    FilterIcon,
    filterName,
}) => {
    return (
        <Container
            $active={filter === filterName ? true : false}
            onClick={() => handleFilterChange(filterName)}
        >
            <Icon>
                <FilterIcon
                    color={filter === filterName ? "#fff" : "#fff"}
                    weight={filter === filterName ? "fill" : "light"}
                    size={22}
                />
            </Icon>
            <Name>
                {filterName}
            </Name>
        </Container>
    );
}

export default Filter;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: .5rem 1.2rem;
    cursor: pointer;
    user-select: none;
    transition: all .3s ease;
    margin-bottom: .3rem;

    ${props => props.$active && `
        background-color: ${props.theme.taskImportant};
    `}
`;

const Icon = styled.div`
    margin-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Name = styled.div`
    text-transform: capitalize;
    font-size: .9rem;
    font-weight: 500;
    color: ${props => props.theme.text};
`;