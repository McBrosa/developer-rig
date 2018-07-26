import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { setupMountTest } from '../tests/enzyme-util/mount';
import { ExtensionForTest } from '../tests/constants/extension';
import { ExtensionFrame } from './component';
import { ExtensionViewType, ExtensionAnchor, ExtensionMode, ExtensionState } from '../constants/extension-coordinator';

describe('<ExtensionFrame />', () => {
  const setupShallow = setupShallowTest(ExtensionFrame, () => ({
    frameId: '0',
    extension: ExtensionForTest,
    type: ExtensionAnchor.Panel,
    mode: ExtensionMode.Viewer,
    iframe: '',
    bindIframeToParent: jest.fn(),
  }));

  const setupMount = setupMountTest(ExtensionFrame, () => ({
    className: 'view',
    frameId: '0',
    extension: ExtensionForTest,
    type: ExtensionAnchor.Panel,
    mode: ExtensionMode.Viewer,
    iframe: '',
    bindIframeToParent: jest.fn(),
  }));

  it('onload postMessages data correctly', () => {
    const { wrapper } = setupMount();

    const mockIframeRef: any = {
      contentWindow: {
        postMessage: jest.fn(),
      },
    };

    const instance = wrapper.instance() as ExtensionFrame;
    instance.iframe = mockIframeRef;
    instance.extensionFrameInit();
    expect(mockIframeRef.contentWindow.postMessage).toHaveBeenCalledWith({
      'action': 'extension-frame-init',
      'extension': {
        'anchor': 'panel',
        'extension': {
          'anchor': 'panel',
          'authorName': 'test',
          'bitsEnabled': false,
          'canInstall': true,
          'channelId': 'channelId',
          'description': 'description',
          'eulaTosUrl': 'test.biz',
          'iconUrl': 'iconUrl',
          'iconUrls': {},
          'id': 'id',
          'installationCount': 0,
          'name': 'name',
          'panelHeight': 300,
          'privacyPolicyUrl': 'test.com',
          'requestIdentityLink': false,
          'requiredBroadcasterAbilities': ['test'],
          'screenshotUrls': ['test.png'],
          'sku': 'sku',
          'state': ExtensionState.Testing,
          'summary': 'summary',
          'supportEmail': 'test',
          'token': 'token',
          'vendorCode': 'vendorCode',
          'version': '0.1',
          'views': {
            'component': { 'aspectHeight': 3000, 'aspectWidth': 2500, 'size': 0, 'viewerUrl': 'test', 'zoom': false, zoomPixels: 1024 },
            'config': { 'viewerUrl': 'test' },
            'liveConfig': { 'viewerUrl': 'test' },
            'videoOverlay': { 'viewerUrl': 'test' },
            'mobile': { 'viewerUrl': 'test' },
            'panel': { height: 300, 'viewerUrl': 'test' }
          },
          'whitelistedConfigUrls': ['foo'],
          'whitelistedPanelUrls': ['bar'] },
          'iframeClassName': 'extension-frame',
          'loginId': null,
          'mode': 'viewer',
          'platform': 'web',
          'trackingProperties': {}
        },
      'frameId': '0'
    }, '*');
  });

  it('onload postMessages data correctly when platform is mobile', () => {
    const { wrapper } = setupMount({
      type: ExtensionViewType.Mobile
    });

    const mockIframeRef: any = {
      contentWindow: {
        postMessage: jest.fn(),
      },
    };
    const instance = wrapper.instance() as ExtensionFrame;
    instance.iframe = mockIframeRef;
    instance.extensionFrameInit();
    expect(mockIframeRef.contentWindow.postMessage).toHaveBeenCalledWith({
      'action': 'extension-frame-init',
      'extension': {
        'anchor': 'mobile',
        'extension': {
          'anchor': 'panel',
          'authorName': 'test',
          'bitsEnabled': false,
          'canInstall': true,
          'channelId': 'channelId',
          'description': 'description',
          'eulaTosUrl': 'test.biz',
          'iconUrl': 'iconUrl',
          'iconUrls': {},
          'id': 'id',
          'installationCount': 0,
          'name': 'name',
          'panelHeight': 300,
          'privacyPolicyUrl': 'test.com',
          'requestIdentityLink': false,
          'requiredBroadcasterAbilities': ['test'],
          'screenshotUrls': ['test.png'],
          'sku': 'sku',
          'state': ExtensionState.Testing,
          'summary': 'summary',
          'supportEmail': 'test',
          'token': 'token',
          'vendorCode': 'vendorCode',
          'version': '0.1',
          'views': {
            'component': { 'aspectHeight': 3000, 'aspectWidth': 2500, 'size': 0, 'viewerUrl': 'test', 'zoom': false, zoomPixels: 1024 },
            'config': { 'viewerUrl': 'test' },
            'liveConfig': { 'viewerUrl': 'test' },
            'videoOverlay': { 'viewerUrl': 'test' },
            'mobile': { 'viewerUrl': 'test' },
            'panel': { height: 300, 'viewerUrl': 'test' }
          },
          'whitelistedConfigUrls': ['foo'],
          'whitelistedPanelUrls': ['bar'] },
          'iframeClassName': 'extension-frame',
          'loginId': null,
          'mode': 'viewer',
          'platform': 'mobile',
          'trackingProperties': {}
        },
      'frameId': '0'
    }, '*');
  });

  describe('when in live config mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.LiveConfig,
        mode: ExtensionMode.Dashboard,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in live config mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.LiveConfig,
        mode: ExtensionMode.Dashboard,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in config mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.Config,
        mode: ExtensionMode.Config,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in panel mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Panel,
        mode: ExtensionMode.Viewer,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in video overlay mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.VideoOverlay,
        mode: ExtensionMode.Viewer,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in video overlay mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.VideoOverlay,
        mode: ExtensionMode.Viewer,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
