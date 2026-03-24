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
  cameraPosition: [0, 0, 20], // [x, y, z]
  cameraLookAt: [0, 0, 0],
  bloomIntensity: 0,
  cameraShake: 0,
  loadingComplete: false,
  selectedWaypoint: null,
});

export default store;
