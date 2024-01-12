import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../Redux/contactSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (e) => {
    dispatch(updateFilter(e.target.value.toLowerCase()));
  };

  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default Filter;
