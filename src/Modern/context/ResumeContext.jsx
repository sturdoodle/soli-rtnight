import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SAMPLE_JSON_DATA } from '../../V4/components/utils/constat.js';

const ResumeContext = createContext();

const STORAGE_KEY = 'modern_resume_data';
const STORAGE_TYPE_KEY = 'modern_resume_storage_preference';
const STORAGE_TIMESTAMP_KEY = 'modern_resume_timestamp';
const EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 Days in milliseconds

const getInitialState = () => {
  try {
    // 1. Determine preference (default to persistent)
    const type = localStorage.getItem(STORAGE_TYPE_KEY) || 'persistent';
    
    // 2. Check for expiration (3-day TTL)
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
    if (timestamp && Date.now() - parseInt(timestamp) > EXPIRATION_MS) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
      localStorage.removeItem(STORAGE_TYPE_KEY);
    }

    // 3. Load from the preferred storage
    const storage = type === 'persistent' ? localStorage : sessionStorage;
    const savedData = storage.getItem(STORAGE_KEY);
    
    if (!savedData || savedData === 'undefined') return {
      ...SAMPLE_JSON_DATA,
      selectedTemplate: SAMPLE_JSON_DATA.selectedTemplate || 'template-2',
      themeColor: SAMPLE_JSON_DATA.themeColor || '#334155',
      themeMode: SAMPLE_JSON_DATA.themeMode || 'dark',
      atsMode: SAMPLE_JSON_DATA.atsMode ?? true,
      storageType: type,
      editorStyle: 'modern',
      fontFamily: SAMPLE_JSON_DATA.fontFamily || 'Default',
      predictiveScoreEnabled: false,
      sectionThemingEnabled: true
    };
    
    const parsedData = JSON.parse(savedData);
    return { 
      ...parsedData, 
      storageType: type, 
      editorStyle: parsedData.editorStyle || 'modern',
      predictiveScoreEnabled: parsedData.predictiveScoreEnabled ?? false,
      sectionThemingEnabled: parsedData.sectionThemingEnabled ?? true
    };
  } catch (error) {
    console.error("Error loading saved resume data:", error);
    return {
      ...SAMPLE_JSON_DATA,
      selectedTemplate: SAMPLE_JSON_DATA.selectedTemplate || 'template-2',
      themeColor: SAMPLE_JSON_DATA.themeColor || '#334155',
      themeMode: SAMPLE_JSON_DATA.themeMode || 'dark',
      atsMode: SAMPLE_JSON_DATA.atsMode ?? true,
      storageType: 'persistent',
      predictiveScoreEnabled: false,
      sectionThemingEnabled: true
    };
  }
};

const initialState = getInitialState();

function resumeReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'UPDATE_FIELD':
      newState = { ...state, [action.field]: action.value };
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
        themeColor: SAMPLE_JSON_DATA.themeColor || '#334155',
        themeMode: SAMPLE_JSON_DATA.themeMode || 'dark',
        atsMode: SAMPLE_JSON_DATA.atsMode ?? true,
        storageType: state.storageType,
        predictiveScoreEnabled: false,
        sectionThemingEnabled: true
      };
      break;
    default:
      return state;
  }
  return newState;
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  useEffect(() => {
    // 1. Sync current state with active storage
    const storage = state.storageType === 'persistent' ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // 2. Update preference key and timestamp (3-day TTL tracker)
    localStorage.setItem(STORAGE_TYPE_KEY, state.storageType);
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());

    // 3. Cleanup logic: when switching, ensure the other storage is wiped
    if (state.storageType === 'persistent') {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    // 4. Dark Mode Sync
    if (state.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state, state.themeMode, state.storageType]);

  const updateField = (field, value) => dispatch({ type: 'UPDATE_FIELD', field, value });
  const updateSection = (section, value) => dispatch({ type: 'UPDATE_SECTION', section, value });
  const setResumeData = (data) => dispatch({ type: 'SET_RESUME_DATA', payload: data });
  const toggleAts = () => dispatch({ type: 'TOGGLE_ATS' });
  const resetResume = () => dispatch({ type: 'RESET_RESUME' });
  const updateStorageType = (type) => dispatch({ type: 'UPDATE_STORAGE_TYPE', payload: type });

  return (
    <ResumeContext.Provider value={{
      resumeData: state,
      updateField,
      updateSection,
      setResumeData,
      toggleAts,
      updateTemplate: (templateId) => dispatch({ type: 'UPDATE_TEMPLATE', templateId }),
      updateThemeColor: (color) => dispatch({ type: 'UPDATE_THEME_COLOR', color }),
      toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
      toggleSectionTheming: () => dispatch({ type: 'TOGGLE_SECTION_THEMING' }),
      updateStorageType,
      setEditorStyle: (style) => dispatch({ type: 'SET_EDITOR_STYLE', payload: style }),
      resetResume
    }}>
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
