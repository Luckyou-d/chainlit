const getRouterBasename = () => {
  const ogTitleMeta = document.querySelector('meta[property="og:root_path"]');
  if (ogTitleMeta && typeof ogTitleMeta.getAttribute('content') === 'string') {
    return ogTitleMeta.getAttribute('content')!;
  } else {
    return '';
  }
};

/**
 * A root-relative asset URL with the router basename in front of it.
 *
 * Vite bakes an asset's URL from its own `base` (`/`), so a bundle served under
 * `CHAINLIT_ROOT_PATH` asks for `/assets/...` and gets a 404. Anything already
 * absolute - another origin, a protocol-relative URL - is left alone.
 */
export const withRouterBasename = (url: string) => {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return url;
  }

  return `${getRouterBasename()}${url}`;
};

export default getRouterBasename;
