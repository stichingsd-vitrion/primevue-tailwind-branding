import {computed} from 'vue';
import {createGlobalState, StorageSerializers, useStorage} from "@vueuse/core";
import {updatePreset, updateSurfacePalette} from "@primevue/themes";

enum ThemeNames {
    Brand1 = 'brand1',
    Brand2 = 'brand2',
    Brand3 = 'brand3',
}

export const primaryColors = [
    {
        name: ThemeNames.Brand1,
        palette: {
            50: '#f2fbf4',
            100: '#e2f6e7',
            200: '#c6eccf',
            300: '#99dca9',
            400: '#52bb6c',
            500: '#40a75a',
            600: '#308947',
            700: '#296c3a',
            800: '#255632',
            900: '#20472a',
            950: '#0d2614'
        }
    },
    {
        name: ThemeNames.Brand3,
        palette: {
            50: '#92c121',
            100: '#eff9ce',
            200: '#dff3a3',
            300: '#b0db40',
            400: '#b0db40',
            500: '#92c121',
            600: '#709a16',
            700: '#567516',
            800: '#455d17',
            900: '#3c4f18',
            950: '#1e2c07'
        }
    },
    {
        name: ThemeNames.Brand2,
        palette: {
            50: '#fff8ec',
            100: '#fff0d3',
            200: '#ffdda5',
            300: '#ffc46d',
            400: '#ff9f32',
            500: '#ff820a',
            600: '#ff6900',
            700: '#cc4b02',
            800: '#a13a0b',
            900: '#82320c',
            950: '#461704'
        }
    }
]

export interface themeConfig {
    primary: ThemeNames
    surface: string | null;
    darkTheme: boolean;
}

export const surfaces = [
    {
        name: 'slate',
        palette: {
            0: '#ffffff',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617'
        }
    },
    {
        name: 'gray',
        palette: {
            0: '#ffffff',
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712'
        }
    },
    {
        name: 'zinc',
        palette: {
            0: '#ffffff',
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b'
        }
    },
    {
        name: 'neutral',
        palette: {
            0: '#ffffff',
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a'
        }
    },
    {
        name: 'stone',
        palette: {
            0: '#ffffff',
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
            950: '#0c0a09'
        }
    },
    {
        name: 'soho',
        palette: {
            0: '#ffffff',
            50: '#f4f4f4',
            100: '#e8e9e9',
            200: '#d2d2d4',
            300: '#bbbcbe',
            400: '#a5a5a9',
            500: '#8e8f93',
            600: '#77787d',
            700: '#616268',
            800: '#4a4b52',
            900: '#34343d',
            950: '#1d1e27'
        }
    },
    {
        name: 'viva',
        palette: {
            0: '#ffffff',
            50: '#f3f3f3',
            100: '#e7e7e8',
            200: '#cfd0d0',
            300: '#b7b8b9',
            400: '#9fa1a1',
            500: '#87898a',
            600: '#6e7173',
            700: '#565a5b',
            800: '#3e4244',
            900: '#262b2c',
            950: '#0e1315'
        }
    },
    {
        name: 'ocean',
        palette: {
            0: '#ffffff',
            50: '#fbfcfc',
            100: '#F7F9F8',
            200: '#EFF3F2',
            300: '#DADEDD',
            400: '#B1B7B6',
            500: '#828787',
            600: '#5F7274',
            700: '#415B61',
            800: '#29444E',
            900: '#183240',
            950: '#0c1920'
        }
    }
]
export const useTheme = createGlobalState(() => {


    const themeConfig = useStorage<themeConfig>('themeConfig', {
        primary: ThemeNames.Brand1,
        surface: 'gray',
        darkTheme: false,
    }, undefined, {serializer: StorageSerializers.object})

    const setPrimary = (value: ThemeNames) => {
        themeConfig.value.primary = value;
    };

    const setSurface = (value: string | null) => {
        themeConfig.value.surface = value;
    };


    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();
            return;
        }
        document.startViewTransition(() => executeDarkModeToggle());
    };

    const updateDocumentDarkMode = ()=>{
        if (themeConfig.value.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    const executeDarkModeToggle = () => {
        themeConfig.value.darkTheme = !themeConfig.value.darkTheme;
        updateDocumentDarkMode();
    };


    const isDarkTheme = computed(() => themeConfig.value.darkTheme);

    const getPrimary = computed(() => themeConfig.value.primary);

    const getSurface = computed(() => themeConfig.value.surface);

    function getPresetExt() {
        const color = primaryColors.find((c) => c.name === themeConfig.value.primary);
        if (!color) {
            throw new Error('Primary color not found');
        }
        return {
            semantic: {
                primary: color.palette,
                colorScheme: {
                    light: {
                        primary: {
                            color: '{primary.500}',
                            contrastColor: '#ffffff',
                            hoverColor: '{primary.600}',
                            activeColor: '{primary.700}'
                        },
                        highlight: {
                            background: '{primary.50}',
                            focusBackground: '{primary.100}',
                            color: '{primary.700}',
                            focusColor: '{primary.800}'
                        }
                    },
                    dark: {
                        primary: {
                            color: '{primary.400}',
                            contrastColor: '{surface.900}',
                            hoverColor: '{primary.300}',
                            activeColor: '{primary.200}'
                        },
                        highlight: {
                            background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                            focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                            color: 'rgba(255,255,255,.87)',
                            focusColor: 'rgba(255,255,255,.87)'
                        }
                    }
                }
            }
        }
    }

    function updateColors(type: 'primary' | 'surface', color: {
        name: any,
        palette: Record<string, string>
    }) {
        if (type === 'primary') {
            setPrimary(color.name);
        } else if (type === 'surface') {
            setSurface(color.name);
        }

        applyTheme(type, color);
    }

    function applyTheme(type: 'primary' | 'surface', color: {
        name: ThemeNames,
        palette: Record<string, string>
    }) {
        if (type === 'primary') {
            updatePreset(getPresetExt());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

    updatePreset(getPresetExt());
    updateDocumentDarkMode();

    return {
        updateColors,
        themeConfig,
        isDarkTheme,
        getPrimary,
        getSurface,
        toggleDarkMode,
        setPrimary,
        setSurface,
    };
})
