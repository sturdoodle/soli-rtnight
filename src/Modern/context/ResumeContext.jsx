"use client";

import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback, useState } from 'react';
import { SAMPLE_JSON_DATA } from '../../utils/constants.js';

const ResumeContext = createContext();

const STORAGE_KEY = 'modern_resume_data';
const STORAGE_TYPE_KEY = 'modern_resume_storage_preference';
const STORAGE_TIMESTAMP_KEY = 'modern_resume_timestamp';
const EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 Days in milliseconds

const ensureAbsoluteUrl = (url) => {
  if (!url) return '';
  if (typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
    return url;
  }
  return `https://${url}`;
};

const DEFAULT_STATE = {
  ...SAMPLE_JSON_DATA,
  selectedTemplate: SAMPLE_JSON_DATA.selectedTemplate || 'template-2',
  themeColor: SAMPLE_JSON_DATA.themeColor || '#0f172a',
  themeMode: SAMPLE_JSON_DATA.themeMode || 'light',
  atsMode: SAMPLE_JSON_DATA.atsMode ?? true,
  storageType: 'persistent',
  editorStyle: 'modern',
  fontFamily: SAMPLE_JSON_DATA.fontFamily || 'Default',
  predictiveScoreEnabled: false,
  sectionThemingEnabled: true
};

function resumeReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };
    case 'UPDATE_FIELD':
      if (action.field.includes('.')) {
        const keys = action.field.split('.');
        const lastKey = keys.pop();
        newState = { ...state };
        let current = newState;
        keys.forEach(key => {
          if (Array.isArray(current[key])) {
            current[key] = [...current[key]];
          } else {
            current[key] = { ...current[key] };
          }
          current = current[key];
        });
        current[lastKey] = action.value;
      } else {
        newState = { ...state, [action.field]: action.value };
      }
      break;
    case 'UPDATE_SECTION':
      newState = { ...state, [action.section]: action.value };
      break;
    case 'TOGGLE_ATS':
      newState = { ...state, atsMode: !state.atsMode };
      break;
    case 'SET_RESUME_DATA':
      newState = { ...action.payload, storageType: state.storageType };
      break;
    case 'UPDATE_TEMPLATE':
      newState = { ...state, selectedTemplate: action.templateId };
      break;
    case 'UPDATE_THEME_COLOR':
      newState = { ...state, themeColor: action.color };
      break;
    case 'TOGGLE_SECTION_THEMING':
      newState = { ...state, sectionThemingEnabled: !state.sectionThemingEnabled };
      break;
    case 'TOGGLE_THEME':
      newState = { ...state, themeMode: state.themeMode === 'light' ? 'dark' : 'light' };
      break;
    case 'UPDATE_STORAGE_TYPE':
      newState = { ...state, storageType: action.payload };
      break;
    case 'SET_EDITOR_STYLE':
      newState = { ...state, editorStyle: action.payload };
      break;
    case 'RESET_RESUME':
      newState = {
        ...SAMPLE_JSON_DATA,
        selectedTemplate: SAMPLE_JSON_DATA.selectedTemplate || 'template-2',
        themeColor: SAMPLE_JSON_DATA.themeColor || '#0f172a',
        themeMode: SAMPLE_JSON_DATA.themeMode || 'light',
        atsMode: SAMPLE_JSON_DATA.atsMode ?? true,
        storageType: state.storageType,
        predictiveScoreEnabled: false,
        sectionThemingEnabled: true
      };
      break;
    case 'ADD_ITEM':
      if (action.path) {
        const keys = action.path.split('.');
        newState = { ...state };
        let current = newState;
        keys.forEach(key => {
          if (Array.isArray(current[key])) {
            current[key] = [...current[key]];
          } else {
            current[key] = { ...current[key] };
          }
          current = current[key];
        });
        if (Array.isArray(current)) {
          current.push(action.payload || {});
        }
      }
      break;
    case 'DELETE_ITEM':
      if (action.path) {
        const keys = action.path.split('.');
        const indexToDelete = parseInt(keys.pop());
        newState = { ...state };
        let current = newState;
        keys.forEach(key => {
          if (Array.isArray(current[key])) {
            current[key] = [...current[key]];
          } else {
            current[key] = { ...current[key] };
          }
          current = current[key];
        });
        if (Array.isArray(current)) {
          current.splice(indexToDelete, 1);
        }
      }
      break;
    default:
      return state;
  }
  return newState;
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Initial Hydration from Storage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const type = localStorage.getItem(STORAGE_TYPE_KEY) || 'persistent';
      const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
      
      if (timestamp && Date.now() - parseInt(timestamp) > EXPIRATION_MS) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
        localStorage.removeItem(STORAGE_TYPE_KEY);
      } else {
        const storage = type === 'persistent' ? localStorage : sessionStorage;
        const savedData = storage.getItem(STORAGE_KEY);
        
        if (savedData && savedData !== 'undefined') {
          const parsedData = JSON.parse(savedData);
          
          if (parsedData.projects) {
            parsedData.projects = parsedData.projects.map(p => ({
              ...p,
              link: ensureAbsoluteUrl(p.link)
            }));
          }

          dispatch({ type: 'HYDRATE', payload: { ...parsedData, storageType: type } });
        }
      }
    } catch (error) {
      console.error("Error hydrating resume data:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Sync to Storage on Changes (Debounced to prevent performance lag)
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;

    const syncToStorage = () => {
      try {
        const storage = state.storageType === 'persistent' ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
        
        localStorage.setItem(STORAGE_TYPE_KEY, state.storageType);
        localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());

        if (state.storageType === 'persistent') {
          sessionStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error("Storage sync failed:", e);
      }
    };

    const timeoutId = setTimeout(syncToStorage, 1000); // 1s debounce

    // Theme Sync (Immediate, as it's cheap and affects UI directly)
    if (state.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => clearTimeout(timeoutId);
  }, [state, isHydrated]);

  const updateField = useCallback((field, value) => dispatch({ type: 'UPDATE_FIELD', field, value }), []);
  const updateSection = useCallback((section, value) => dispatch({ type: 'UPDATE_SECTION', section, value }), []);
  const setResumeData = useCallback((data) => dispatch({ type: 'SET_RESUME_DATA', payload: data }), []);
  const toggleAts = useCallback(() => dispatch({ type: 'TOGGLE_ATS' }), []);
  const resetResume = useCallback(() => dispatch({ type: 'RESET_RESUME' }), []);
  const updateStorageType = useCallback((type) => dispatch({ type: 'UPDATE_STORAGE_TYPE', payload: type }), []);

  const updateDeepField = useCallback((path, value) => {
    dispatch({ type: 'UPDATE_FIELD', field: path, value }); // The reducer needs to handle path strings
  }, []);

  const contextValue = useMemo(() => ({
    resumeData: state,
    updateField,
    updateSection,
    updateDeepField,
    setResumeData,
    toggleAts,
    updateTemplate: (templateId) => dispatch({ type: 'UPDATE_TEMPLATE', templateId }),
    updateThemeColor: (color) => dispatch({ type: 'UPDATE_THEME_COLOR', color }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    toggleSectionTheming: () => dispatch({ type: 'TOGGLE_SECTION_THEMING' }),
    updateStorageType,
    setEditorStyle: (style) => dispatch({ type: 'SET_EDITOR_STYLE', payload: style }),
    addItem: (path, payload) => dispatch({ type: 'ADD_ITEM', path, payload }),
    deleteItem: (path) => dispatch({ type: 'DELETE_ITEM', path }),
    resetResume,
    isHydrated
  }), [state, updateField, updateSection, updateDeepField, setResumeData, toggleAts, updateStorageType, resetResume, isHydrated]);

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
