/**
 * Remoku Adaptive ECP Transport Client
 * Handles Google Chrome Local Network Access (LNA) fetch with fallback to legacy form POST.
 * 
 * Author: A. Cassidy Napoli <gonzotek@gmail.com>
 * Project: Remoku (https://remoku.tv)
 */

(function(global) {
  'use strict';

  var RemokuTransport = {
    // Current transport mode in use ('lna-fetch', 'legacy-form', or 'auto')
    mode: 'auto',

    /**
     * Send an ECP command to a Roku device.
     * @param {string} rokuIp - Target Roku IP address.
     * @param {string} action - ECP endpoint ('keypress', 'keydown', 'keyup', 'launch', 'install', etc.)
     * @param {string} [param] - Key name, app ID, or query parameters.
     * @param {Object} [options] - Optional settings { method, body, timeout }
     * @returns {Promise<{ success: boolean, transport: string }>}
     */
    send: function(rokuIp, action, param, options) {
      if (!rokuIp) {
        if (typeof global.firstSetup === 'function') {
          global.firstSetup();
        }
        return Promise.reject(new Error('No Roku IP configured'));
      }

      options = options || {};
      var method = options.method || 'POST';
      var path = param ? (action + '/' + param) : action;
      var url = 'http://' + rokuIp + ':8060/' + path;

      if (typeof global.dbg === 'function') {
        global.dbg('ECP ' + method + ' ' + url);
      }

      // 1. Try modern Fetch with Google Chrome Local Network Access (LNA) spec
      if (typeof global.fetch === 'function' && RemokuTransport.mode !== 'legacy-form') {
        try {
          var fetchOptions = {
            method: method,
            mode: 'no-cors',
            cache: 'no-store'
          };

          // Include Local Network Access targetAddressSpace if supported
          try {
            fetchOptions.targetAddressSpace = 'private';
          } catch (e) {
            // Ignore if browser restricts targetAddressSpace property assignment
          }

          if (options.body) {
            fetchOptions.body = options.body;
          }

          return global.fetch(url, fetchOptions).then(function() {
            RemokuTransport.mode = 'lna-fetch';
            return { success: true, transport: 'lna-fetch' };
          }).catch(function(fetchErr) {
            if (typeof global.dbg === 'function') {
              global.dbg('LNA Fetch error, falling back to legacy form: ' + fetchErr);
            }
            return RemokuTransport.sendLegacyForm(url, method);
          });
        } catch (err) {
          if (typeof global.dbg === 'function') {
            global.dbg('Fetch exception, using legacy form: ' + err);
          }
        }
      }

      // 2. Fallback to legacy hidden Form POST via hidden iframe
      return Promise.resolve(RemokuTransport.sendLegacyForm(url, method));
    },

    /**
     * Send text / characters to Roku with ECP LIT_ encoding.
     * @param {string} rokuIp 
     * @param {string} char 
     */
    sendChar: function(rokuIp, char) {
      var encoded;
      if (char === '/') {
        encoded = '%2f';
      } else if (char === '@') {
        encoded = '%40';
      } else if (char === '+') {
        encoded = '%2b';
      } else if (char === ' ') {
        encoded = '%20';
      } else {
        encoded = encodeURIComponent(char);
      }
      return RemokuTransport.send(rokuIp, 'keypress', 'LIT_' + encoded);
    },

    /**
     * Legacy Form POST transport targeting hidden iframe (CORS bypass for older browsers).
     */
    sendLegacyForm: function(url, method) {
      RemokuTransport.mode = 'legacy-form';
      var form = document.getElementById('rokupost');
      if (!form) {
        form = document.createElement('form');
        form.id = 'rokupost';
        form.style.display = 'none';
        form.style.visibility = 'hidden';
        form.method = method || 'POST';
        form.target = 'rokuresponse';
        document.body.appendChild(form);
      }

      var iframe = document.getElementById('rokuresponse');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'rokuresponse';
        iframe.name = 'rokuresponse';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        document.body.appendChild(iframe);
      }

      form.setAttribute('action', url);
      form.submit();
      return { success: true, transport: 'legacy-form' };
    }
  };

  global.RemokuTransport = RemokuTransport;
})(typeof window !== 'undefined' ? window : this);
