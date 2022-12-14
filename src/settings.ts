interface DefaultSettings {
    title: string;
    showSettings: boolean;
    tagsView: boolean;
    fixedHeader: boolean;
    sidebarLogo: boolean;
    errorLog: string;
}

const defaultSettings: DefaultSettings = {
    title: '漫涂拾光',
    showSettings: true,
    tagsView: true,
    fixedHeader: false,
    // 是否显示Logo
    sidebarLogo: true,
    errorLog: 'production'
};

export default defaultSettings;
