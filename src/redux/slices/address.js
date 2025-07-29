import { sum, map, filter, uniqBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  address: {
    _id: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    zip: null,
    state: null,
    country: null
  }
};

const slice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // ADDRESS
    getAddress(state) {
      state.address._id = _id;
      state.address.addressLine1 = addressLine1;
      state.address.addressLine2 = addressLine2;
      state.address.city = city;
      state.address.zip = zip;
      state.address.state = state;
      state.address.country = country;
    },

    saveAddress(state, action) {
      const newAddress = action.payload;

      state.address._id = newAddress._id;
      state.address.addressLine1 = newAddress.addressLine1;
      state.address.addressLine2 = newAddress.addressLine2;
      state.address.city = newAddress.city;
      state.address.zip = newAddress.zip;
      state.address.state = newAddress.state;
      state.address.country = newAddress.country;
    },

    deleteAddress(state) {
      state.address._id = null;
      state.address.addressLine1 = null;
      state.address.addressLine2 = null;
      state.address.city = null;
      state.address.zip = null;
      state.address.state = null;
      state.address.country = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getAddress, saveAddress, deleteAddress } = slice.actions;
