import {
  TEST_CACHE_DISABLED,
} from 'base/Cache.js';
import {
  TEST_GIG_SERVER_DISABLED,
  TEST_GEO_SERVER_DISABLED,
} from 'core/Server.js';

import './TestMode.css';

export default function TestMode(props) {
  const details = Object.entries(
    {
      TEST_CACHE_DISABLED,
      TEST_GIG_SERVER_DISABLED,
      TEST_GEO_SERVER_DISABLED,
    }
  ).filter(([k, v]) => v).map(([k, v]) => k).join(' ;');

  if (!details) {
    return null;
  }

  return (
    <div className="div-test-mode">
      {`Test Mode: ${details}`}
    </div>
  )
}
