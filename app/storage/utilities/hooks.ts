import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { Dispatch, Storage } from '../index';

export const useSelector: TypedUseSelectorHook<Storage> = useReduxSelector;

export const useDispatch: <D extends Dispatch = Dispatch>() => D = useReduxDispatch;