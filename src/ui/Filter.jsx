import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  const currentPage = searchParams.get("page");

  // 如果searchParams改变，也就是说如果用户切换了不同的Filter，如果searchParams里有page的话就把page重置为1
  useEffect(() => {
    if (currentPage) {
      searchParams.set("page", 1);
    }
  }, [searchParams, currentPage]);

  function handleClick(value) {
    searchParams.set(filterField, value);

    // 也可以使用这个写法来实现：如果用户切换了不同的Filter，如果searchParams里有page的话就把page重置为1
    // if (searchParams.get("page")) {
    //   searchParams.set("page", 1);
    // }

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {/* <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        No Discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With Discount
      </FilterButton> */}
      {options.map((option) => {
        return (
          <FilterButton
            onClick={() => handleClick(option.value)}
            key={option.value}
            active={option.value === currentFilter}
            disabled={option.value === currentFilter}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}

export default Filter;

