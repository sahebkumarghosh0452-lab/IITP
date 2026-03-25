/* Lightweight reactive store to bridge GSAP scroll progress → R3F scene state */

const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (partial) => {
      state = { ...state, ...partial };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

const store = createStore({
  scrollProgress: 0,        // 0–1 overall scroll progress
  activeSection: 0,          // 0–4 section index
  cameraPosition: [2, 0, 5], // [x, y, z] — close to Earth at launch
  cameraLookAt: [0, 0, 0],
  bloomIntensity: 0,
  cameraShake: 0,
  rocketProgress: 0,         // 0–1 rocket launch progress
  loadingComplete: false,
  selectedWaypoint: null,
});

export default store;
