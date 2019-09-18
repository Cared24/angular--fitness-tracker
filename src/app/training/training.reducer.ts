import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {  } from './training.actions';
import { Exercise } from './exercise.model';

import * as fromRoot from '../app.reducer';
import { 
    TrainingActions,
    SET_AVAILABLE_TRAININGS,
    SET_FINISHED_TRAININGS,
    START_TRAINING,
    STOP_TRAINING
} from './training.actions';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                /*
                This store here has actually more than one property.
                So when we set a whaleboat exercises before doing that we will
                actually first of all distribute the old state properties.
                
                We do that because this will pull out Finished and active training 
                and store them in this new object we are creating and also pull out 
                available exercises and it will then only overwrite the old available
                exercises with the new ones.

                If we wouldn't do this then our new state after this action would be an object
                 with just available exercises and our old finished exercise and active training 
                 would be lost.  This is why we should always update state like this.
                Pull out the old properties and then override what we have to change.
                */
                ...state,
                availableExercises: action.payload
            };

        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };

        case START_TRAINING:
            return {
                ...state,
                activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
            };

        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);