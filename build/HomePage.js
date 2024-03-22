// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS((exports, module) => {
  if (true) {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
      }
      var ReactVersion = "18.3.0-canary-a870b2d54-20240314";
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var REACT_CACHE_TYPE = Symbol.for("react.cache");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactCurrentDispatcher$1 = {
        current: null
      };
      var ReactCurrentCache = {
        current: null
      };
      var ReactCurrentBatchConfig = {
        transition: null
      };
      var ReactCurrentActQueue = {
        current: null,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false
      };
      var ReactCurrentOwner$1 = {
        current: null
      };
      var ReactDebugCurrentFrame$1 = {};
      var currentExtraStackFrame = null;
      {
        ReactDebugCurrentFrame$1.setExtraStackFrame = function(stack) {
          {
            currentExtraStackFrame = stack;
          }
        };
        ReactDebugCurrentFrame$1.getCurrentStack = null;
        ReactDebugCurrentFrame$1.getStackAddendum = function() {
          var stack = "";
          if (currentExtraStackFrame) {
            stack += currentExtraStackFrame;
          }
          var impl = ReactDebugCurrentFrame$1.getCurrentStack;
          if (impl) {
            stack += impl() || "";
          }
          return stack;
        };
      }
      var ReactSharedInternals = {
        ReactCurrentDispatcher: ReactCurrentDispatcher$1,
        ReactCurrentCache,
        ReactCurrentBatchConfig,
        ReactCurrentOwner: ReactCurrentOwner$1
      };
      {
        ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame$1;
        ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
      }
      function warn(format) {
        {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;_key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
      }
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor;
          var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
          var warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return;
          }
          error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
          didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      var ReactNoopUpdateQueue = {
        isMounted: function(publicInstance) {
          return false;
        },
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      };
      var assign = Object.assign;
      var emptyObject = {};
      {
        Object.freeze(emptyObject);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
          throw new Error("takes an object of state variables to update or a function which returns an object of state variables.");
        }
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        };
        var defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
              return;
            }
          });
        };
        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy;
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      function createRef() {
        var refObject = {
          current: null
        };
        {
          Object.seal(refObject);
        }
        return refObject;
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableRenderableContext = false;
      var __NEXT_MAJOR__ = false;
      var enableRefAsProp = __NEXT_MAJOR__;
      var enableDebugTracing = false;
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      var REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        if (typeof type === "function") {
          if (type.$$typeof === REACT_CLIENT_REFERENCE$2) {
            return null;
          }
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_CACHE_TYPE: {
            return "Cache";
          }
        }
        if (typeof type === "object") {
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE: {
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            }
            case REACT_CONTEXT_TYPE:
              var context = type;
              {
                return getContextName(context) + ".Consumer";
              }
            case REACT_CONSUMER_TYPE: {
              return null;
            }
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference");
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || enableRenderableContext || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, ownerFn) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            var control;
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                var maybePromise = fn();
                if (maybePromise && typeof maybePromise.catch === "function") {
                  maybePromise.catch(function() {
                  });
                }
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                return [sample.stack, control.stack];
              }
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
        if (namePropDescriptor && namePropDescriptor.configurable) {
          Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot"
          });
        }
        try {
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n");
            var controlLines = controlStack.split("\n");
            var s = 0;
            var c = 0;
            while (s < sampleLines.length && !sampleLines[s].includes("DetermineComponentFrameRoot")) {
              s++;
            }
            while (c < controlLines.length && !controlLines[c].includes("DetermineComponentFrameRoot")) {
              c++;
            }
            if (s === sampleLines.length || c === controlLines.length) {
              s = sampleLines.length - 1;
              c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
            }
            for (;s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      if (true) {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://react.dev/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
      }
      function ReactElement(type, key, _ref, self, source, owner, props) {
        var ref;
        {
          ref = _ref;
        }
        var element;
        {
          element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
        }
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      }
      function createElement(type, config, children) {
        {
          if (!isValidElementType(type)) {
            var info = "";
            if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          } else {
            for (var i = 2;i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
        }
        var propName;
        var props = {};
        var key = null;
        var ref = null;
        if (config != null) {
          if (hasValidRef(config)) {
            {
              ref = config.ref;
            }
            {
              warnIfStringRefCannotBeAutoConverted(config, config.__self);
            }
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "ref" && propName !== "__self" && propName !== "__source") {
              props[propName] = config[propName];
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var _i = 0;_i < childrenLength; _i++) {
            childArray[_i] = arguments[_i + 2];
          }
          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        {
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
        var element = ReactElement(type, key, ref, undefined, undefined, ReactCurrentOwner.current, props);
        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        }
        return element;
      }
      var didWarnAboutDeprecatedCreateFactory = false;
      function createFactory(type) {
        var factory = createElement.bind(null, type);
        factory.type = type;
        {
          if (!didWarnAboutDeprecatedCreateFactory) {
            didWarnAboutDeprecatedCreateFactory = true;
            warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
          }
          Object.defineProperty(factory, "type", {
            enumerable: false,
            get: function() {
              warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
              Object.defineProperty(this, "type", {
                value: type
              });
              return type;
            }
          });
        }
        return factory;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, oldElement.ref, undefined, undefined, oldElement._owner, oldElement.props);
      }
      function cloneElement(element, config, children) {
        if (element === null || element === undefined) {
          throw new Error("The argument must be a React element, but you passed " + element + ".");
        }
        var propName;
        var props = assign({}, element.props);
        var key = element.key;
        var ref = element.ref;
        var owner = element._owner;
        if (config != null) {
          if (hasValidRef(config)) {
            {
              ref = config.ref;
            }
            owner = ReactCurrentOwner.current;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          var defaultProps;
          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "ref" && propName !== "__self" && propName !== "__source" && !enableRefAsProp) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0;i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          props.children = childArray;
        }
        var clonedElement = ReactElement(element.type, key, ref, undefined, undefined, owner, props);
        for (var _i2 = 2;_i2 < arguments.length; _i2++) {
          validateChildKeys(arguments[_i2], clonedElement.type);
        }
        return clonedElement;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object" || !node) {
            return;
          }
          if (node.$$typeof === REACT_CLIENT_REFERENCE)
            ;
          else if (isArray(node)) {
            for (var i = 0;i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function isValidElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var ownerHasKeyUseWarning = {};
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement(null);
        }
      }
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = getComponentNameFromType(parentType);
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0;i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement(null);
          }
        }
      }
      var SEPARATOR = ".";
      var SUBSEPARATOR = ":";
      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          "=": "=0",
          ":": "=2"
        };
        var escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        if (typeof element === "object" && element !== null && element.key != null) {
          {
            checkKeyStringCoercion(element.key);
          }
          return escape("" + element.key);
        }
        return index.toString(36);
      }
      function noop$1() {
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled": {
            var fulfilledValue = thenable.value;
            return fulfilledValue;
          }
          case "rejected": {
            var rejectedError = thenable.reason;
            throw rejectedError;
          }
          default: {
            if (typeof thenable.status === "string") {
              thenable.then(noop$1, noop$1);
            } else {
              var pendingThenable = thenable;
              pendingThenable.status = "pending";
              pendingThenable.then(function(fulfilledValue2) {
                if (thenable.status === "pending") {
                  var fulfilledThenable2 = thenable;
                  fulfilledThenable2.status = "fulfilled";
                  fulfilledThenable2.value = fulfilledValue2;
                }
              }, function(error2) {
                if (thenable.status === "pending") {
                  var rejectedThenable2 = thenable;
                  rejectedThenable2.status = "rejected";
                  rejectedThenable2.reason = error2;
                }
              });
            }
            switch (thenable.status) {
              case "fulfilled": {
                var fulfilledThenable = thenable;
                return fulfilledThenable.value;
              }
              case "rejected": {
                var rejectedThenable = thenable;
                var _rejectedError = rejectedThenable.reason;
                throw _rejectedError;
              }
            }
          }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if (type === "undefined" || type === "boolean") {
          children = null;
        }
        var invokeCallback = false;
        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case "bigint": {
              break;
            }
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  var payload = children._payload;
                  var init = children._init;
                  return mapIntoArray(init(payload), array, escapedPrefix, nameSoFar, callback);
              }
          }
        }
        if (invokeCallback) {
          var _child = children;
          var mappedChild = callback(_child);
          var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (isArray(mappedChild)) {
            var escapedChildKey = "";
            if (childKey != null) {
              escapedChildKey = escapeUserProvidedKey(childKey) + "/";
            }
            mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else if (mappedChild != null) {
            if (isValidElement(mappedChild)) {
              {
                if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                  checkKeyStringCoercion(mappedChild.key);
                }
              }
              mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
            }
            array.push(mappedChild);
          }
          return 1;
        }
        var child;
        var nextName;
        var subtreeCount = 0;
        var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (isArray(children)) {
          for (var i = 0;i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getElementKey(child, i);
            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          }
        } else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn === "function") {
            var iterableChildren = children;
            {
              if (iteratorFn === iterableChildren.entries) {
                if (!didWarnAboutMaps) {
                  warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(iterableChildren);
            var step;
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getElementKey(child, ii++);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else if (type === "object") {
            if (typeof children.then === "function") {
              return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            }
            var childrenString = String(children);
            throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        var count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function countChildren(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement(children)) {
          throw new Error("React.Children.only expected to receive a single React element child.");
        }
        return children;
      }
      function createContext(defaultValue) {
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        {
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                }
              }
            });
            context.Consumer = Consumer;
          }
        }
        {
          context._currentRenderer = null;
          context._currentRenderer2 = null;
        }
        return context;
      }
      var Uninitialized = -1;
      var Pending = 0;
      var Resolved = 1;
      var Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result;
          var thenable = ctor();
          thenable.then(function(moduleObject2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var resolved = payload;
              resolved._status = Resolved;
              resolved._result = moduleObject2;
            }
          }, function(error2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var rejected = payload;
              rejected._status = Rejected;
              rejected._result = error2;
            }
          });
          if (payload._status === Uninitialized) {
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
          }
        }
        if (payload._status === Resolved) {
          var moduleObject = payload._result;
          {
            if (moduleObject === undefined) {
              error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
            }
          }
          {
            if (!("default" in moduleObject)) {
              error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
            }
          }
          return moduleObject.default;
        } else {
          throw payload._result;
        }
      }
      function lazy(ctor) {
        var payload = {
          _status: Uninitialized,
          _result: ctor
        };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps;
          var propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: true,
              get: function() {
                return defaultProps;
              },
              set: function(newDefaultProps) {
                error("It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                defaultProps = newDefaultProps;
                Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: true
                });
              }
            },
            propTypes: {
              configurable: true,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                propTypes = newPropTypes;
                Object.defineProperty(lazyType, "propTypes", {
                  enumerable: true
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef(render) {
        {
          if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
            error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
          } else if (typeof render !== "function") {
            error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
          } else {
            if (render.length !== 0 && render.length !== 2) {
              error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
            }
          }
          if (render != null) {
            if (render.defaultProps != null) {
              error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
            }
          }
        }
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!render.name && !render.displayName) {
                render.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      function memo(type, compare) {
        {
          if (!isValidElementType(type)) {
            error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
          }
        }
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === undefined ? null : compare
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!type.name && !type.displayName) {
                type.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      var UNTERMINATED = 0;
      var TERMINATED = 1;
      var ERRORED = 2;
      function createCacheRoot() {
        return new WeakMap;
      }
      function createCacheNode() {
        return {
          s: UNTERMINATED,
          v: undefined,
          o: null,
          p: null
        };
      }
      function cache$1(fn) {
        return function() {
          var dispatcher = ReactCurrentCache.current;
          if (!dispatcher) {
            return fn.apply(null, arguments);
          }
          var fnMap = dispatcher.getCacheForType(createCacheRoot);
          var fnNode = fnMap.get(fn);
          var cacheNode;
          if (fnNode === undefined) {
            cacheNode = createCacheNode();
            fnMap.set(fn, cacheNode);
          } else {
            cacheNode = fnNode;
          }
          for (var i = 0, l = arguments.length;i < l; i++) {
            var arg = arguments[i];
            if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
              var objectCache = cacheNode.o;
              if (objectCache === null) {
                cacheNode.o = objectCache = new WeakMap;
              }
              var objectNode = objectCache.get(arg);
              if (objectNode === undefined) {
                cacheNode = createCacheNode();
                objectCache.set(arg, cacheNode);
              } else {
                cacheNode = objectNode;
              }
            } else {
              var primitiveCache = cacheNode.p;
              if (primitiveCache === null) {
                cacheNode.p = primitiveCache = new Map;
              }
              var primitiveNode = primitiveCache.get(arg);
              if (primitiveNode === undefined) {
                cacheNode = createCacheNode();
                primitiveCache.set(arg, cacheNode);
              } else {
                cacheNode = primitiveNode;
              }
            }
          }
          if (cacheNode.s === TERMINATED) {
            return cacheNode.v;
          }
          if (cacheNode.s === ERRORED) {
            throw cacheNode.v;
          }
          try {
            var result = fn.apply(null, arguments);
            var terminatedNode = cacheNode;
            terminatedNode.s = TERMINATED;
            terminatedNode.v = result;
            return result;
          } catch (error2) {
            var erroredNode = cacheNode;
            erroredNode.s = ERRORED;
            erroredNode.v = error2;
            throw error2;
          }
        };
      }
      var cache = cache$1;
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher$1.current;
        {
          if (dispatcher === null) {
            error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }
        return dispatcher;
      }
      function useContext(Context) {
        var dispatcher = resolveDispatcher();
        {
          if (Context.$$typeof === REACT_CONSUMER_TYPE) {
            error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
          }
        }
        return dispatcher.useContext(Context);
      }
      function useState(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
      }
      function useRef(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useInsertionEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useInsertionEffect(create, deps);
      }
      function useLayoutEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      function useTransition() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useTransition();
      }
      function useDeferredValue(value, initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDeferredValue(value, initialValue);
      }
      function useId() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useId();
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      }
      function useCacheRefresh() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCacheRefresh();
      }
      function use(usable) {
        var dispatcher = resolveDispatcher();
        return dispatcher.use(usable);
      }
      function useOptimistic(passthrough, reducer) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useOptimistic(passthrough, reducer);
      }
      function startTransition(scope, options) {
        var prevTransition = ReactCurrentBatchConfig.transition;
        var callbacks = new Set;
        var transition = {
          _callbacks: callbacks
        };
        ReactCurrentBatchConfig.transition = transition;
        var currentTransition = ReactCurrentBatchConfig.transition;
        {
          ReactCurrentBatchConfig.transition._updatedFibers = new Set;
        }
        {
          try {
            var returnValue = scope();
            if (typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function") {
              callbacks.forEach(function(callback) {
                return callback(currentTransition, returnValue);
              });
              returnValue.then(noop, onError);
            }
          } catch (error2) {
            onError(error2);
          } finally {
            warnAboutTransitionSubscriptions(prevTransition, currentTransition);
            ReactCurrentBatchConfig.transition = prevTransition;
          }
        }
      }
      function warnAboutTransitionSubscriptions(prevTransition, currentTransition) {
        {
          if (prevTransition === null && currentTransition._updatedFibers) {
            var updatedFibersCount = currentTransition._updatedFibers.size;
            currentTransition._updatedFibers.clear();
            if (updatedFibersCount > 10) {
              warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
            }
          }
        }
      }
      function noop() {
      }
      var onError = typeof reportError === "function" ? reportError : function(error2) {
        console["error"](error2);
      };
      var didWarnAboutMessageChannel = false;
      var enqueueTaskImpl = null;
      function enqueueTask(task) {
        if (enqueueTaskImpl === null) {
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            var nodeRequire = module && module[requireString];
            enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              {
                if (didWarnAboutMessageChannel === false) {
                  didWarnAboutMessageChannel = true;
                  if (typeof MessageChannel === "undefined") {
                    error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                  }
                }
              }
              var channel = new MessageChannel;
              channel.port1.onmessage = callback;
              channel.port2.postMessage(undefined);
            };
          }
        }
        return enqueueTaskImpl(task);
      }
      var actScopeDepth = 0;
      var didWarnNoAwaitAct = false;
      function act(callback) {
        {
          var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
          var prevActQueue = ReactCurrentActQueue.current;
          var prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactCurrentActQueue.current = prevActQueue !== null ? prevActQueue : [];
          ReactCurrentActQueue.isBatchingLegacy = true;
          var result;
          var didAwaitActCall = false;
          try {
            ReactCurrentActQueue.didScheduleLegacyUpdate = false;
            result = callback();
            var didScheduleLegacyUpdate = ReactCurrentActQueue.didScheduleLegacyUpdate;
            if (!prevIsBatchingLegacy && didScheduleLegacyUpdate) {
              flushActQueue(queue);
            }
            ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
          } catch (error2) {
            ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            popActScope(prevActQueue, prevActScopeDepth);
            throw error2;
          }
          if (result !== null && typeof result === "object" && typeof result.then === "function") {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              if (!didAwaitActCall && !didWarnNoAwaitAct) {
                didWarnNoAwaitAct = true;
                error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
              }
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(function(returnValue2) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (prevActScopeDepth === 0) {
                    try {
                      flushActQueue(queue);
                      enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      });
                    } catch (error2) {
                      reject(error2);
                    }
                  } else {
                    resolve(returnValue2);
                  }
                }, function(error2) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  reject(error2);
                });
              }
            };
          } else {
            var returnValue = result;
            popActScope(prevActQueue, prevActScopeDepth);
            if (prevActScopeDepth === 0) {
              flushActQueue(queue);
              if (queue.length !== 0) {
                queueSeveralMicrotasks(function() {
                  if (!didAwaitActCall && !didWarnNoAwaitAct) {
                    didWarnNoAwaitAct = true;
                    error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)");
                  }
                });
              }
              ReactCurrentActQueue.current = null;
            }
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                if (prevActScopeDepth === 0) {
                  ReactCurrentActQueue.current = queue;
                  enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  });
                } else {
                  resolve(returnValue);
                }
              }
            };
          }
        }
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        {
          if (prevActScopeDepth !== actScopeDepth - 1) {
            error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
          }
          actScopeDepth = prevActScopeDepth;
        }
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        {
          var queue = ReactCurrentActQueue.current;
          if (queue !== null) {
            if (queue.length !== 0) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              ReactCurrentActQueue.current = null;
              resolve(returnValue);
            }
          } else {
            resolve(returnValue);
          }
        }
      }
      var isFlushing = false;
      function flushActQueue(queue) {
        {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (;i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactCurrentActQueue.didUsePromise = false;
                  var continuation = callback(false);
                  if (continuation !== null) {
                    if (ReactCurrentActQueue.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else {
                    break;
                  }
                } while (true);
              }
              queue.length = 0;
            } catch (error2) {
              queue.splice(0, i + 1);
              throw error2;
            } finally {
              isFlushing = false;
            }
          }
        }
      }
      var queueSeveralMicrotasks = typeof queueMicrotask === "function" ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      var Children = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
      exports.act = act;
      exports.cache = cache;
      exports.cloneElement = cloneElement;
      exports.createContext = createContext;
      exports.createElement = createElement;
      exports.createFactory = createFactory;
      exports.createRef = createRef;
      exports.forwardRef = forwardRef;
      exports.isValidElement = isValidElement;
      exports.lazy = lazy;
      exports.memo = memo;
      exports.startTransition = startTransition;
      exports.unstable_useCacheRefresh = useCacheRefresh;
      exports.use = use;
      exports.useCallback = useCallback;
      exports.useContext = useContext;
      exports.useDebugValue = useDebugValue;
      exports.useDeferredValue = useDeferredValue;
      exports.useEffect = useEffect;
      exports.useId = useId;
      exports.useImperativeHandle = useImperativeHandle;
      exports.useInsertionEffect = useInsertionEffect;
      exports.useLayoutEffect = useLayoutEffect;
      exports.useMemo = useMemo;
      exports.useOptimistic = useOptimistic;
      exports.useReducer = useReducer;
      exports.useRef = useRef;
      exports.useState = useState;
      exports.useSyncExternalStore = useSyncExternalStore;
      exports.useTransition = useTransition;
      exports.version = ReactVersion;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
      }
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  var react_development = __toESM(require_react_development(), 1);
  if (false) {
  } else {
    module.exports = react_development;
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS((exports) => {
  var React = __toESM(require_react(), 1);
  if (true) {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var REACT_CACHE_TYPE = Symbol.for("react.cache");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableRenderableContext = false;
      var enableDebugTracing = false;
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      var REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        if (typeof type === "function") {
          if (type.$$typeof === REACT_CLIENT_REFERENCE$2) {
            return null;
          }
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_CACHE_TYPE: {
            return "Cache";
          }
        }
        if (typeof type === "object") {
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE: {
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            }
            case REACT_CONTEXT_TYPE:
              var context = type;
              {
                return getContextName(context) + ".Consumer";
              }
            case REACT_CONSUMER_TYPE: {
              return null;
            }
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var assign = Object.assign;
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference");
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || enableRenderableContext || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, ownerFn) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            var control;
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                var maybePromise = fn();
                if (maybePromise && typeof maybePromise.catch === "function") {
                  maybePromise.catch(function() {
                  });
                }
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                return [sample.stack, control.stack];
              }
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
        if (namePropDescriptor && namePropDescriptor.configurable) {
          Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot"
          });
        }
        try {
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n");
            var controlLines = controlStack.split("\n");
            var s = 0;
            var c = 0;
            while (s < sampleLines.length && !sampleLines[s].includes("DetermineComponentFrameRoot")) {
              s++;
            }
            while (c < controlLines.length && !controlLines[c].includes("DetermineComponentFrameRoot")) {
              c++;
            }
            if (s === sampleLines.length || c === controlLines.length) {
              s = sampleLines.length - 1;
              c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
            }
            for (;s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      if (true) {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://react.dev/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
      }
      function ReactElement(type, key, _ref, self, source, owner, props) {
        var ref;
        {
          ref = _ref;
        }
        var element;
        {
          element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
        }
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      }
      var didWarnAboutKeySpread = {};
      function jsxDEV$1(type, config, maybeKey, isStaticChildren, source, self) {
        {
          if (!isValidElementType(type)) {
            var info = "";
            if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          } else {
            var children = config.children;
            if (children !== undefined) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0;i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          if (hasOwnProperty.call(config, "key")) {
            var componentName = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return k !== "key";
            });
            var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            if (!didWarnAboutKeySpread[componentName + beforeExample]) {
              var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
              error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
              didWarnAboutKeySpread[componentName + beforeExample] = true;
            }
          }
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== undefined) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            {
              ref = config.ref;
            }
            {
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "ref") {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          var element = ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          }
          return element;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object" || !node) {
            return;
          }
          if (node.$$typeof === REACT_CLIENT_REFERENCE)
            ;
          else if (isArray(node)) {
            for (var i = 0;i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function isValidElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var ownerHasKeyUseWarning = {};
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement(null);
        }
      }
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = getComponentNameFromType(parentType);
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0;i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement(null);
          }
        }
      }
      var jsxDEV = jsxDEV$1;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsxDEV = jsxDEV;
    })();
  }
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS((exports, module) => {
  var react_jsx_dev_runtime_development = __toESM(require_react_jsx_dev_runtime_development(), 1);
  if (false) {
  } else {
    module.exports = react_jsx_dev_runtime_development;
  }
});

// examples/HomePage.tsx
var {$ } = globalThis.Bun;
import {Timer as Timer2} from "client:$454f122d";

// examples/example0.client.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ExampleClientView() {
  console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.");
  return jsx_dev_runtime.jsxDEV("div", {
    children: "ExampleClientView"
  }, undefined, false, undefined, this);
}
"use client";
console.debug("executing", import.meta.url);

// examples/HomePage.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
import {doStuffOnTheServer} from "server:$aa6ce7b4";
function HomePage() {
  return jsx_dev_runtime2.jsxDEV("main", {
    children: [
      jsx_dev_runtime2.jsxDEV("h1", {
        children: "Hello, world!"
      }, undefined, false, undefined, this),
      jsx_dev_runtime2.jsxDEV("h2", {
        children: jsx_dev_runtime2.jsxDEV(Timer2, {}, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      jsx_dev_runtime2.jsxDEV(Uname, {}, undefined, false, undefined, this),
      jsx_dev_runtime2.jsxDEV(ServerCode_fromUseServerFile, {}, undefined, false, undefined, this),
      jsx_dev_runtime2.jsxDEV(ExampleClientView, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
async function Uname() {
  const uname = await $`uname -a`.text();
  return jsx_dev_runtime2.jsxDEV("div", {
    children: [
      "uname: ",
      uname
    ]
  }, undefined, true, undefined, this);
}
async function ServerCode_fromUseServerFile() {
  const stuff = await doStuffOnTheServer();
  return jsx_dev_runtime2.jsxDEV("section", {
    children: [
      jsx_dev_runtime2.jsxDEV("h2", {
        children: "doStuffOnTheServer"
      }, undefined, false, undefined, this),
      jsx_dev_runtime2.jsxDEV("div", {
        children: jsx_dev_runtime2.jsxDEV("pre", {
          children: stuff
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
console.debug("executing", import.meta.url);
export {
  HomePage
};

//# debugId=697CA44837780B5B64756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC1qc3gtZGV2LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsICIuLi9leGFtcGxlcy9Ib21lUGFnZS50c3giLCAiLi4vZXhhbXBsZXMvZXhhbXBsZTAuY2xpZW50LnRzeCIsICIuLi9leGFtcGxlcy9Ib21lUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbCiAgICAiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gKi9cbmlmIChcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQgPT09XG4gICAgJ2Z1bmN0aW9uJ1xuKSB7XG4gIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQobmV3IEVycm9yKCkpO1xufVxuICAgICAgICAgIHZhciBSZWFjdFZlcnNpb24gPSAnMTguMy4wLWNhbmFyeS1hODcwYjJkNTQtMjAyNDAzMTQnO1xuXG4vLyBBVFRFTlRJT05cbi8vIFdoZW4gYWRkaW5nIG5ldyBzeW1ib2xzIHRvIHRoaXMgZmlsZSxcbi8vIFBsZWFzZSBjb25zaWRlciBhbHNvIGFkZGluZyB0byAncmVhY3QtZGV2dG9vbHMtc2hhcmVkL3NyYy9iYWNrZW5kL1JlYWN0U3ltYm9scydcbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKTtcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpOyAvLyBUT0RPOiBEZWxldGUgd2l0aCBlbmFibGVSZW5kZXJhYmxlQ29udGV4dFxuXG52YXIgUkVBQ1RfQ09OU1VNRVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnN1bWVyJyk7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJyk7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubGF6eScpO1xudmFyIFJFQUNUX09GRlNDUkVFTl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Qub2Zmc2NyZWVuJyk7XG52YXIgUkVBQ1RfQ0FDSEVfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNhY2hlJyk7XG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIGlmIChtYXliZUl0ZXJhYmxlID09PSBudWxsIHx8IHR5cGVvZiBtYXliZUl0ZXJhYmxlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuXG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgZGlzcGF0Y2hlci5cbiAqL1xudmFyIFJlYWN0Q3VycmVudERpc3BhdGNoZXIkMSA9IHtcbiAgY3VycmVudDogbnVsbFxufTtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBDYWNoZSBkaXNwYXRjaGVyLlxuICovXG52YXIgUmVhY3RDdXJyZW50Q2FjaGUgPSB7XG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgYmF0Y2gncyBjb25maWd1cmF0aW9uIHN1Y2ggYXMgaG93IGxvbmcgYW4gdXBkYXRlXG4gKiBzaG91bGQgc3VzcGVuZCBmb3IgaWYgaXQgbmVlZHMgdG8uXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyA9IHtcbiAgdHJhbnNpdGlvbjogbnVsbFxufTtcblxudmFyIFJlYWN0Q3VycmVudEFjdFF1ZXVlID0ge1xuICBjdXJyZW50OiBudWxsLFxuICAvLyBVc2VkIHRvIHJlcHJvZHVjZSBiZWhhdmlvciBvZiBgYmF0Y2hlZFVwZGF0ZXNgIGluIGxlZ2FjeSBtb2RlLlxuICBpc0JhdGNoaW5nTGVnYWN5OiBmYWxzZSxcbiAgZGlkU2NoZWR1bGVMZWdhY3lVcGRhdGU6IGZhbHNlLFxuICAvLyBUcmFja3Mgd2hldGhlciBzb21ldGhpbmcgY2FsbGVkIGB1c2VgIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCBvZiB3b3JrLlxuICAvLyBEZXRlcm1pbmVzIHdoZXRoZXIgd2Ugc2hvdWxkIHlpZWxkIHRvIG1pY3JvdGFza3MgdG8gdW53cmFwIGFscmVhZHkgcmVzb2x2ZWRcbiAgLy8gcHJvbWlzZXMgd2l0aG91dCBzdXNwZW5kaW5nLlxuICBkaWRVc2VQcm9taXNlOiBmYWxzZVxufTtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciQxID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEgPSB7fTtcbnZhciBjdXJyZW50RXh0cmFTdGFja0ZyYW1lID0gbnVsbDtcblxue1xuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuc2V0RXh0cmFTdGFja0ZyYW1lID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAge1xuICAgICAgY3VycmVudEV4dHJhU3RhY2tGcmFtZSA9IHN0YWNrO1xuICAgIH1cbiAgfTsgLy8gU3RhY2sgaW1wbGVtZW50YXRpb24gaW5qZWN0ZWQgYnkgdGhlIGN1cnJlbnQgcmVuZGVyZXIuXG5cblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuZ2V0Q3VycmVudFN0YWNrID0gbnVsbDtcblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhY2sgPSAnJzsgLy8gQWRkIGFuIGV4dHJhIHRvcCBmcmFtZSB3aGlsZSBhbiBlbGVtZW50IGlzIGJlaW5nIHZhbGlkYXRlZFxuXG4gICAgaWYgKGN1cnJlbnRFeHRyYVN0YWNrRnJhbWUpIHtcbiAgICAgIHN0YWNrICs9IGN1cnJlbnRFeHRyYVN0YWNrRnJhbWU7XG4gICAgfSAvLyBEZWxlZ2F0ZSB0byB0aGUgaW5qZWN0ZWQgcmVuZGVyZXItc3BlY2lmaWMgaW1wbGVtZW50YXRpb25cblxuXG4gICAgdmFyIGltcGwgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuZ2V0Q3VycmVudFN0YWNrO1xuXG4gICAgaWYgKGltcGwpIHtcbiAgICAgIHN0YWNrICs9IGltcGwoKSB8fCAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IHtcbiAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjogUmVhY3RDdXJyZW50RGlzcGF0Y2hlciQxLFxuICBSZWFjdEN1cnJlbnRDYWNoZTogUmVhY3RDdXJyZW50Q2FjaGUsXG4gIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnOiBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyxcbiAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyJDFcbn07XG5cbntcbiAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMTtcbiAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50QWN0UXVldWUgPSBSZWFjdEN1cnJlbnRBY3RRdWV1ZTtcbn1cblxuLy8gYnkgY2FsbHMgdG8gdGhlc2UgbWV0aG9kcyBieSBhIEJhYmVsIHBsdWdpbi5cbi8vXG4vLyBJbiBQUk9EIChvciBpbiBwYWNrYWdlcyB3aXRob3V0IGFjY2VzcyB0byBSZWFjdCBpbnRlcm5hbHMpLFxuLy8gdGhleSBhcmUgbGVmdCBhcyB0aGV5IGFyZSBpbnN0ZWFkLlxuXG5mdW5jdGlvbiB3YXJuKGZvcm1hdCkge1xuICB7XG4gICAge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nKCd3YXJuJywgZm9ybWF0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGVycm9yKGZvcm1hdCkge1xuICB7XG4gICAge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nKCdlcnJvcicsIGZvcm1hdCwgYXJncyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByaW50V2FybmluZyhsZXZlbCwgZm9ybWF0LCBhcmdzKSB7XG4gIC8vIFdoZW4gY2hhbmdpbmcgdGhpcyBsb2dpYywgeW91IG1pZ2h0IHdhbnQgdG8gYWxzb1xuICAvLyB1cGRhdGUgY29uc29sZVdpdGhTdGFja0Rldi53d3cuanMgYXMgd2VsbC5cbiAge1xuICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcblxuICAgIGlmIChzdGFjayAhPT0gJycpIHtcbiAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtzdGFja10pO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG5cblxuICAgIHZhciBhcmdzV2l0aEZvcm1hdCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGl0ZW0pO1xuICAgIH0pOyAvLyBDYXJlZnVsOiBSTiBjdXJyZW50bHkgZGVwZW5kcyBvbiB0aGlzIHByZWZpeFxuXG4gICAgYXJnc1dpdGhGb3JtYXQudW5zaGlmdCgnV2FybmluZzogJyArIGZvcm1hdCk7IC8vIFdlIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIHNwcmVhZCAob3IgLmFwcGx5KSBkaXJlY3RseSBiZWNhdXNlIGl0XG4gICAgLy8gYnJlYWtzIElFOTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzYxMFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmdcblxuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGVbbGV2ZWxdLCBjb25zb2xlLCBhcmdzV2l0aEZvcm1hdCk7XG4gIH1cbn1cblxudmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIChfY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgX2NvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyBcIi5cIiArIGNhbGxlck5hbWU7XG5cbiAgICBpZiAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXJyb3IoXCJDYW4ndCBjYWxsICVzIG9uIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IHlldCBtb3VudGVkLiBcIiArICdUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBtaWdodCBpbmRpY2F0ZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiAnICsgJ0luc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCAnICsgJ2NsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcblxuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cblxuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG57XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuXG5cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7IC8vIElmIGEgY29tcG9uZW50IGhhcyBzdHJpbmcgcmVmcywgd2Ugd2lsbCBhc3NpZ24gYSBkaWZmZXJlbnQgb2JqZWN0IGxhdGVyLlxuXG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0OyAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cblxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5cbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHBhcnRpYWxTdGF0ZSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHBhcnRpYWxTdGF0ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBwYXJ0aWFsU3RhdGUgIT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSAnICsgJ2Z1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgJ3NldFN0YXRlJyk7XG59O1xuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblxuXG5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xufTtcbi8qKlxuICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAqIG1vZGVybiBiYXNlIGNsYXNzLiBJbnN0ZWFkLCB3ZSBkZWZpbmUgYSBnZXR0ZXIgdGhhdCB3YXJucyBpZiBpdCdzIGFjY2Vzc2VkLlxuICovXG5cblxue1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG5cbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3YXJuKCclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4vKipcbiAqIENvbnZlbmllbmNlIGNvbXBvbmVudCB3aXRoIGRlZmF1bHQgc2hhbGxvdyBlcXVhbGl0eSBjaGVjayBmb3Igc0NVLlxuICovXG5cbmZ1bmN0aW9uIFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0OyAvLyBJZiBhIGNvbXBvbmVudCBoYXMgc3RyaW5nIHJlZnMsIHdlIHdpbGwgYXNzaWduIGEgZGlmZmVyZW50IG9iamVjdCBsYXRlci5cblxuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxudmFyIHB1cmVDb21wb25lbnRQcm90b3R5cGUgPSBQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xucHVyZUNvbXBvbmVudFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFB1cmVDb21wb25lbnQ7IC8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuXG5hc3NpZ24ocHVyZUNvbXBvbmVudFByb3RvdHlwZSwgQ29tcG9uZW50LnByb3RvdHlwZSk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxuLy8gYW4gaW1tdXRhYmxlIG9iamVjdCB3aXRoIGEgc2luZ2xlIG11dGFibGUgdmFsdWVcbmZ1bmN0aW9uIGNyZWF0ZVJlZigpIHtcbiAgdmFyIHJlZk9iamVjdCA9IHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG5cbiAge1xuICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gIH1cblxuICByZXR1cm4gcmVmT2JqZWN0O1xufVxuXG52YXIgaXNBcnJheUltcGwgPSBBcnJheS5pc0FycmF5OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYSkge1xuICByZXR1cm4gaXNBcnJheUltcGwoYSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBlbmFibGVTY29wZUFQSSA9IGZhbHNlOyAvLyBFeHBlcmltZW50YWwgQ3JlYXRlIEV2ZW50IEhhbmRsZSBBUEkuXG52YXIgZW5hYmxlQ2FjaGVFbGVtZW50ID0gZmFsc2U7XG52YXIgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgPSBmYWxzZTsgLy8gTm8ga25vd24gYnVncywgYnV0IG5lZWRzIHBlcmZvcm1hbmNlIHRlc3RpbmdcblxudmFyIGVuYWJsZUxlZ2FjeUhpZGRlbiA9IGZhbHNlOyAvLyBFbmFibGVzIHVuc3RhYmxlX2F2b2lkVGhpc0ZhbGxiYWNrIGZlYXR1cmUgaW4gRmliZXJcbnZhciBlbmFibGVSZW5kZXJhYmxlQ29udGV4dCA9IGZhbHNlO1xuLy8gUmVhZHkgZm9yIG5leHQgbWFqb3IuXG4vL1xuLy8gQWxpYXMgX19ORVhUX01BSk9SX18gdG8gZmFsc2UgZm9yIGVhc2llciBza2ltbWluZy5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBfX05FWFRfTUFKT1JfXyA9IGZhbHNlOyAvLyBSZW1vdmVzIGxlZ2FjeSBzdHlsZSBjb250ZXh0XG4vLyBhcyBhIG5vcm1hbCBwcm9wIGluc3RlYWQgb2Ygc3RyaXBwaW5nIGl0IGZyb20gdGhlIHByb3BzIG9iamVjdC5cbi8vIFBhc3NlcyBgcmVmYCBhcyBhIG5vcm1hbCBwcm9wIGluc3RlYWQgb2Ygc3RyaXBwaW5nIGl0IGZyb20gdGhlIHByb3BzIG9iamVjdFxuLy8gZHVyaW5nIGVsZW1lbnQgY3JlYXRpb24uXG5cbnZhciBlbmFibGVSZWZBc1Byb3AgPSBfX05FWFRfTUFKT1JfXztcbi8vIHN0dWZmLiBJbnRlbmRlZCB0byBlbmFibGUgUmVhY3QgY29yZSBtZW1iZXJzIHRvIG1vcmUgZWFzaWx5IGRlYnVnIHNjaGVkdWxpbmdcbi8vIGlzc3VlcyBpbiBERVYgYnVpbGRzLlxuXG52YXIgZW5hYmxlRGVidWdUcmFjaW5nID0gZmFsc2U7XG5cbi8qXG4gKiBUaGUgYCcnICsgdmFsdWVgIHBhdHRlcm4gKHVzZWQgaW4gcGVyZi1zZW5zaXRpdmUgY29kZSkgdGhyb3dzIGZvciBTeW1ib2xcbiAqIGFuZCBUZW1wb3JhbC4qIHR5cGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvMjIwNjQuXG4gKlxuICogVGhlIGZ1bmN0aW9ucyBpbiB0aGlzIG1vZHVsZSB3aWxsIHRocm93IGFuIGVhc2llci10by11bmRlcnN0YW5kLFxuICogZWFzaWVyLXRvLWRlYnVnIGV4Y2VwdGlvbiB3aXRoIGEgY2xlYXIgZXJyb3JzIG1lc3NhZ2UgbWVzc2FnZSBleHBsYWluaW5nIHRoZVxuICogcHJvYmxlbS4gKEluc3RlYWQgb2YgYSBjb25mdXNpbmcgZXhjZXB0aW9uIHRocm93biBpbnNpZGUgdGhlIGltcGxlbWVudGF0aW9uXG4gKiBvZiB0aGUgYHZhbHVlYCBvYmplY3QpLlxuICovXG4vLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dIG9ubHkgY2FsbGVkIGluIERFViwgc28gdm9pZCByZXR1cm4gaXMgbm90IHBvc3NpYmxlLlxuZnVuY3Rpb24gdHlwZU5hbWUodmFsdWUpIHtcbiAge1xuICAgIC8vIHRvU3RyaW5nVGFnIGlzIG5lZWRlZCBmb3IgbmFtZXNwYWNlZCB0eXBlcyBsaWtlIFRlbXBvcmFsLkluc3RhbnRcbiAgICB2YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC50b1N0cmluZ1RhZztcbiAgICB2YXIgdHlwZSA9IGhhc1RvU3RyaW5nVGFnICYmIHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10gfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fCAnT2JqZWN0JzsgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXVxuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbn0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cblxuXG5mdW5jdGlvbiB3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkge1xuICB7XG4gICAgdHJ5IHtcbiAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICAvLyBJZiB5b3UgZW5kZWQgdXAgaGVyZSBieSBmb2xsb3dpbmcgYW4gZXhjZXB0aW9uIGNhbGwgc3RhY2ssIGhlcmUncyB3aGF0J3NcbiAgLy8gaGFwcGVuZWQ6IHlvdSBzdXBwbGllZCBhbiBvYmplY3Qgb3Igc3ltYm9sIHZhbHVlIHRvIFJlYWN0IChhcyBhIHByb3AsIGtleSxcbiAgLy8gRE9NIGF0dHJpYnV0ZSwgQ1NTIHByb3BlcnR5LCBzdHJpbmcgcmVmLCBldGMuKSBhbmQgd2hlbiBSZWFjdCB0cmllZCB0b1xuICAvLyBjb2VyY2UgaXQgdG8gYSBzdHJpbmcgdXNpbmcgYCcnICsgdmFsdWVgLCBhbiBleGNlcHRpb24gd2FzIHRocm93bi5cbiAgLy9cbiAgLy8gVGhlIG1vc3QgY29tbW9uIHR5cGVzIHRoYXQgd2lsbCBjYXVzZSB0aGlzIGV4Y2VwdGlvbiBhcmUgYFN5bWJvbGAgaW5zdGFuY2VzXG4gIC8vIGFuZCBUZW1wb3JhbCBvYmplY3RzIGxpa2UgYFRlbXBvcmFsLkluc3RhbnRgLiBCdXQgYW55IG9iamVjdCB0aGF0IGhhcyBhXG4gIC8vIGB2YWx1ZU9mYCBvciBgW1N5bWJvbC50b1ByaW1pdGl2ZV1gIG1ldGhvZCB0aGF0IHRocm93cyB3aWxsIGFsc28gY2F1c2UgdGhpc1xuICAvLyBleGNlcHRpb24uIChMaWJyYXJ5IGF1dGhvcnMgZG8gdGhpcyB0byBwcmV2ZW50IHVzZXJzIGZyb20gdXNpbmcgYnVpbHQtaW5cbiAgLy8gbnVtZXJpYyBvcGVyYXRvcnMgbGlrZSBgK2Agb3IgY29tcGFyaXNvbiBvcGVyYXRvcnMgbGlrZSBgPj1gIGJlY2F1c2UgY3VzdG9tXG4gIC8vIG1ldGhvZHMgYXJlIG5lZWRlZCB0byBwZXJmb3JtIGFjY3VyYXRlIGFyaXRobWV0aWMgb3IgY29tcGFyaXNvbi4pXG4gIC8vXG4gIC8vIFRvIGZpeCB0aGUgcHJvYmxlbSwgY29lcmNlIHRoaXMgb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZyBiZWZvcmVcbiAgLy8gcGFzc2luZyBpdCB0byBSZWFjdC4gVGhlIG1vc3QgcmVsaWFibGUgd2F5IGlzIHVzdWFsbHkgYFN0cmluZyh2YWx1ZSlgLlxuICAvL1xuICAvLyBUbyBmaW5kIHdoaWNoIHZhbHVlIGlzIHRocm93aW5nLCBjaGVjayB0aGUgYnJvd3NlciBvciBkZWJ1Z2dlciBjb25zb2xlLlxuICAvLyBCZWZvcmUgdGhpcyBleGNlcHRpb24gd2FzIHRocm93biwgdGhlcmUgc2hvdWxkIGJlIGBjb25zb2xlLmVycm9yYCBvdXRwdXRcbiAgLy8gdGhhdCBzaG93cyB0aGUgdHlwZSAoU3ltYm9sLCBUZW1wb3JhbC5QbGFpbkRhdGUsIGV0Yy4pIHRoYXQgY2F1c2VkIHRoZVxuICAvLyBwcm9ibGVtIGFuZCBob3cgdGhhdCB0eXBlIHdhcyB1c2VkOiBrZXksIGF0cnJpYnV0ZSwgaW5wdXQgdmFsdWUgcHJvcCwgZXRjLlxuICAvLyBJbiBtb3N0IGNhc2VzLCB0aGlzIGNvbnNvbGUgb3V0cHV0IGFsc28gc2hvd3MgdGhlIGNvbXBvbmVudCBhbmQgaXRzXG4gIC8vIGFuY2VzdG9yIGNvbXBvbmVudHMgd2hlcmUgdGhlIGV4Y2VwdGlvbiBoYXBwZW5lZC5cbiAgLy9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG4gIHJldHVybiAnJyArIHZhbHVlO1xufVxuZnVuY3Rpb24gY2hlY2tLZXlTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICB7XG4gICAgaWYgKHdpbGxDb2VyY2lvblRocm93KHZhbHVlKSkge1xuICAgICAgZXJyb3IoJ1RoZSBwcm92aWRlZCBrZXkgaXMgYW4gdW5zdXBwb3J0ZWQgdHlwZSAlcy4nICsgJyBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgdXNpbmcgaXQgaGVyZS4nLCB0eXBlTmFtZSh2YWx1ZSkpO1xuXG4gICAgICByZXR1cm4gdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKTsgLy8gdGhyb3cgKHRvIGhlbHAgY2FsbGVycyBmaW5kIHRyb3VibGVzaG9vdGluZyBjb21tZW50cylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IG91dGVyVHlwZS5kaXNwbGF5TmFtZTtcblxuICBpZiAoZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gZGlzcGxheU5hbWU7XG4gIH1cblxuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb25OYW1lICE9PSAnJyA/IHdyYXBwZXJOYW1lICsgXCIoXCIgKyBmdW5jdGlvbk5hbWUgKyBcIilcIiA6IHdyYXBwZXJOYW1lO1xufSAvLyBLZWVwIGluIHN5bmMgd2l0aCByZWFjdC1yZWNvbmNpbGVyL2dldENvbXBvbmVudE5hbWVGcm9tRmliZXJcblxuXG5mdW5jdGlvbiBnZXRDb250ZXh0TmFtZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8ICdDb250ZXh0Jztcbn1cblxudmFyIFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0UkMiA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNsaWVudC5yZWZlcmVuY2UnKTsgLy8gTm90ZSB0aGF0IHRoZSByZWNvbmNpbGVyIHBhY2thZ2Ugc2hvdWxkIGdlbmVyYWxseSBwcmVmZXIgdG8gdXNlIGdldENvbXBvbmVudE5hbWVGcm9tRmliZXIoKSBpbnN0ZWFkLlxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRSQyKSB7XG4gICAgICAvLyBUT0RPOiBDcmVhdGUgYSBjb252ZW50aW9uIGZvciBuYW1pbmcgY2xpZW50IHJlZmVyZW5jZXMgd2l0aCBkZWJ1ZyBpbmZvLlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICByZXR1cm4gJ0ZyYWdtZW50JztcblxuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1BvcnRhbCc7XG5cbiAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICByZXR1cm4gJ1Byb2ZpbGVyJztcblxuICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnU3RyaWN0TW9kZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuXG4gICAgY2FzZSBSRUFDVF9DQUNIRV9UWVBFOlxuICAgICAge1xuICAgICAgICByZXR1cm4gJ0NhY2hlJztcbiAgICAgIH1cblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoKS4gJyArICdUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcHJvdmlkZXIgPSB0eXBlO1xuICAgICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShwcm92aWRlci5fY29udGV4dCkgKyAnLlByb3ZpZGVyJztcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0eXBlO1xuXG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q29udGV4dE5hbWUoY29udGV4dCkgKyAnLkNvbnN1bWVyJztcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0NPTlNVTUVSX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHZhciBvdXRlck5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKG91dGVyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvdXRlck5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ01lbW8nO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoaW5pdChwYXlsb2FkKSk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vICRGbG93Rml4TWVbbWV0aG9kLXVuYmluZGluZ11cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRUFDVF9DTElFTlRfUkVGRVJFTkNFJDEgPSBTeW1ib2wuZm9yKCdyZWFjdC5jbGllbnQucmVmZXJlbmNlJyk7XG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gTm90ZTogdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgKGUuZy4gaWYgaXQncyBhIHBvbHlmaWxsKS5cblxuXG4gIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgZW5hYmxlRGVidWdUcmFjaW5nICB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IGVuYWJsZUxlZ2FjeUhpZGRlbiAgfHwgdHlwZSA9PT0gUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgfHwgZW5hYmxlU2NvcGVBUEkgIHx8IGVuYWJsZUNhY2hlRWxlbWVudCAgfHwgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCBlbmFibGVSZW5kZXJhYmxlQ29udGV4dCAgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCAvLyBUaGlzIG5lZWRzIHRvIGluY2x1ZGUgYWxsIHBvc3NpYmxlIG1vZHVsZSByZWZlcmVuY2Ugb2JqZWN0XG4gICAgLy8gdHlwZXMgc3VwcG9ydGVkIGJ5IGFueSBGbGlnaHQgY29uZmlndXJhdGlvbiBhbnl3aGVyZSBzaW5jZVxuICAgIC8vIHdlIGRvbid0IGtub3cgd2hpY2ggRmxpZ2h0IGJ1aWxkIHRoaXMgd2lsbCBlbmQgdXAgYmVpbmcgdXNlZFxuICAgIC8vIHdpdGguXG4gICAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRSQxIHx8IHR5cGUuZ2V0TW9kdWxlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBIZWxwZXJzIHRvIHBhdGNoIGNvbnNvbGUubG9ncyB0byBhdm9pZCBsb2dnaW5nIGR1cmluZyBzaWRlLWVmZmVjdCBmcmVlXG4vLyByZXBsYXlpbmcgb24gcmVuZGVyIGZ1bmN0aW9uLiBUaGlzIGN1cnJlbnRseSBvbmx5IHBhdGNoZXMgdGhlIG9iamVjdFxuLy8gbGF6aWx5IHdoaWNoIHdvbid0IGNvdmVyIGlmIHRoZSBsb2cgZnVuY3Rpb24gd2FzIGV4dHJhY3RlZCBlYWdlcmx5LlxuLy8gV2UgY291bGQgYWxzbyBlYWdlcmx5IHBhdGNoIHRoZSBtZXRob2QuXG52YXIgZGlzYWJsZWREZXB0aCA9IDA7XG52YXIgcHJldkxvZztcbnZhciBwcmV2SW5mbztcbnZhciBwcmV2V2FybjtcbnZhciBwcmV2RXJyb3I7XG52YXIgcHJldkdyb3VwO1xudmFyIHByZXZHcm91cENvbGxhcHNlZDtcbnZhciBwcmV2R3JvdXBFbmQ7XG5cbmZ1bmN0aW9uIGRpc2FibGVkTG9nKCkge31cblxuZGlzYWJsZWRMb2cuX19yZWFjdERpc2FibGVkTG9nID0gdHJ1ZTtcbmZ1bmN0aW9uIGRpc2FibGVMb2dzKCkge1xuICB7XG4gICAgaWYgKGRpc2FibGVkRGVwdGggPT09IDApIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgICAgcHJldkxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgcHJldkluZm8gPSBjb25zb2xlLmluZm87XG4gICAgICBwcmV2V2FybiA9IGNvbnNvbGUud2FybjtcbiAgICAgIHByZXZFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICBwcmV2R3JvdXAgPSBjb25zb2xlLmdyb3VwO1xuICAgICAgcHJldkdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZDtcbiAgICAgIHByZXZHcm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQ7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTkwOTlcblxuICAgICAgdmFyIHByb3BzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBkaXNhYmxlZExvZyxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXSBGbG93IHRoaW5rcyBjb25zb2xlIGlzIGltbXV0YWJsZS5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29uc29sZSwge1xuICAgICAgICBpbmZvOiBwcm9wcyxcbiAgICAgICAgbG9nOiBwcm9wcyxcbiAgICAgICAgd2FybjogcHJvcHMsXG4gICAgICAgIGVycm9yOiBwcm9wcyxcbiAgICAgICAgZ3JvdXA6IHByb3BzLFxuICAgICAgICBncm91cENvbGxhcHNlZDogcHJvcHMsXG4gICAgICAgIGdyb3VwRW5kOiBwcm9wc1xuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGRpc2FibGVkRGVwdGgrKztcbiAgfVxufVxuZnVuY3Rpb24gcmVlbmFibGVMb2dzKCkge1xuICB7XG4gICAgZGlzYWJsZWREZXB0aC0tO1xuXG4gICAgaWYgKGRpc2FibGVkRGVwdGggPT09IDApIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgICAgdmFyIHByb3BzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lW2Nhbm5vdC13cml0ZV0gRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbnNvbGUsIHtcbiAgICAgICAgbG9nOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZMb2dcbiAgICAgICAgfSksXG4gICAgICAgIGluZm86IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkluZm9cbiAgICAgICAgfSksXG4gICAgICAgIHdhcm46IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldldhcm5cbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZFcnJvclxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXA6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cENvbGxhcHNlZDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBDb2xsYXBzZWRcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwRW5kOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cEVuZFxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZERlcHRoIDwgMCkge1xuICAgICAgZXJyb3IoJ2Rpc2FibGVkRGVwdGggZmVsbCBiZWxvdyB6ZXJvLiAnICsgJ1RoaXMgaXMgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudERpc3BhdGNoZXI7XG52YXIgcHJlZml4O1xuZnVuY3Rpb24gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUobmFtZSwgb3duZXJGbikge1xuICB7XG4gICAgaWYgKHByZWZpeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBFeHRyYWN0IHRoZSBWTSBzcGVjaWZpYyBwcmVmaXggdXNlZCBieSBlYWNoIGxpbmUuXG4gICAgICB0cnkge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICB2YXIgbWF0Y2ggPSB4LnN0YWNrLnRyaW0oKS5tYXRjaCgvXFxuKCAqKGF0ICk/KS8pO1xuICAgICAgICBwcmVmaXggPSBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbiAgICAgIH1cbiAgICB9IC8vIFdlIHVzZSB0aGUgcHJlZml4IHRvIGVuc3VyZSBvdXIgc3RhY2tzIGxpbmUgdXAgd2l0aCBuYXRpdmUgc3RhY2sgZnJhbWVzLlxuXG5cbiAgICByZXR1cm4gJ1xcbicgKyBwcmVmaXggKyBuYW1lO1xuICB9XG59XG52YXIgcmVlbnRyeSA9IGZhbHNlO1xudmFyIGNvbXBvbmVudEZyYW1lQ2FjaGU7XG5cbntcbiAgdmFyIFBvc3NpYmx5V2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nID8gV2Vha01hcCA6IE1hcDtcbiAgY29tcG9uZW50RnJhbWVDYWNoZSA9IG5ldyBQb3NzaWJseVdlYWtNYXAoKTtcbn1cbi8qKlxuICogTGV2ZXJhZ2VzIG5hdGl2ZSBicm93c2VyL1ZNIHN0YWNrIGZyYW1lcyB0byBnZXQgcHJvcGVyIGRldGFpbHMgKGUuZy5cbiAqIGZpbGVuYW1lLCBsaW5lICsgY29sIG51bWJlcikgZm9yIGEgc2luZ2xlIGNvbXBvbmVudCBpbiBhIGNvbXBvbmVudCBzdGFjay4gV2VcbiAqIGRvIHRoaXMgYnk6XG4gKiAgICgxKSB0aHJvd2luZyBhbmQgY2F0Y2hpbmcgYW4gZXJyb3IgaW4gdGhlIGZ1bmN0aW9uIC0gdGhpcyB3aWxsIGJlIG91clxuICogICAgICAgY29udHJvbCBlcnJvci5cbiAqICAgKDIpIGNhbGxpbmcgdGhlIGNvbXBvbmVudCB3aGljaCB3aWxsIGV2ZW50dWFsbHkgdGhyb3cgYW4gZXJyb3IgdGhhdCB3ZSdsbFxuICogICAgICAgY2F0Y2ggLSB0aGlzIHdpbGwgYmUgb3VyIHNhbXBsZSBlcnJvci5cbiAqICAgKDMpIGRpZmZpbmcgdGhlIGNvbnRyb2wgYW5kIHNhbXBsZSBlcnJvciBzdGFja3MgdG8gZmluZCB0aGUgc3RhY2sgZnJhbWVcbiAqICAgICAgIHdoaWNoIHJlcHJlc2VudHMgb3VyIGNvbXBvbmVudC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGNvbnN0cnVjdCkge1xuICAvLyBJZiBzb21ldGhpbmcgYXNrZWQgZm9yIGEgc3RhY2sgaW5zaWRlIGEgZmFrZSByZW5kZXIsIGl0IHNob3VsZCBnZXQgaWdub3JlZC5cbiAgaWYgKCFmbiB8fCByZWVudHJ5KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAge1xuICAgIHZhciBmcmFtZSA9IGNvbXBvbmVudEZyYW1lQ2FjaGUuZ2V0KGZuKTtcblxuICAgIGlmIChmcmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuICB9XG5cbiAgcmVlbnRyeSA9IHRydWU7XG4gIHZhciBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdIEl0IGRvZXMgYWNjZXB0IHVuZGVmaW5lZC5cblxuICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHVuZGVmaW5lZDtcbiAgdmFyIHByZXZpb3VzRGlzcGF0Y2hlcjtcblxuICB7XG4gICAgcHJldmlvdXNEaXNwYXRjaGVyID0gUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50OyAvLyBTZXQgdGhlIGRpc3BhdGNoZXIgaW4gREVWIGJlY2F1c2UgdGhpcyBtaWdodCBiZSBjYWxsIGluIHRoZSByZW5kZXIgZnVuY3Rpb25cbiAgICAvLyBmb3Igd2FybmluZ3MuXG5cbiAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBudWxsO1xuICAgIGRpc2FibGVMb2dzKCk7XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRpbmcgYSBjb21tb24gc3RhY2sgZnJhbWUgYmV0d2VlbiBzYW1wbGUgYW5kIGNvbnRyb2wgZXJyb3JzIGNhbiBiZVxuICAgKiB0cmlja3kgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcyBhbmQgbGV2ZWxzIG9mIHN0YWNrIHRyYWNlIHRydW5jYXRpb24gZnJvbVxuICAgKiBkaWZmZXJlbnQgSlMgVk1zLiBTbyBpbnN0ZWFkIHdlJ2xsIGF0dGVtcHQgdG8gY29udHJvbCB3aGF0IHRoYXQgY29tbW9uXG4gICAqIGZyYW1lIHNob3VsZCBiZSB0aHJvdWdoIHRoaXMgb2JqZWN0IG1ldGhvZDpcbiAgICogSGF2aW5nIGJvdGggdGhlIHNhbXBsZSBhbmQgY29udHJvbCBlcnJvcnMgYmUgaW4gdGhlIGZ1bmN0aW9uIHVuZGVyIHRoZVxuICAgKiBgRGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZVJvb3RgIHByb3BlcnR5LCArIHNldHRpbmcgdGhlIGBuYW1lYCBhbmRcbiAgICogYGRpc3BsYXlOYW1lYCBwcm9wZXJ0aWVzIG9mIHRoZSBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgYSBzdGFja1xuICAgKiBmcmFtZSBleGlzdHMgdGhhdCBoYXMgdGhlIG1ldGhvZCBuYW1lIGBEZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lUm9vdGAgaW5cbiAgICogaXQgZm9yIGJvdGggY29udHJvbCBhbmQgc2FtcGxlIHN0YWNrcy5cbiAgICovXG5cblxuICB2YXIgUnVuSW5Sb290RnJhbWUgPSB7XG4gICAgRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udHJvbDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgdGhyb3cuXG4gICAgICAgIGlmIChjb25zdHJ1Y3QpIHtcbiAgICAgICAgICAvLyBTb21ldGhpbmcgc2hvdWxkIGJlIHNldHRpbmcgdGhlIHByb3BzIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICB2YXIgRmFrZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgfTsgLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG5cblxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGYWtlLnByb3RvdHlwZSwgJ3Byb3BzJywge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIFdlIHVzZSBhIHRocm93aW5nIHNldHRlciBpbnN0ZWFkIG9mIGZyb3plbiBvciBub24td3JpdGFibGUgcHJvcHNcbiAgICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGF0IHdvbid0IHRocm93IGluIGEgbm9uLXN0cmljdCBtb2RlIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmNvbnN0cnVjdCkge1xuICAgICAgICAgICAgLy8gV2UgY29uc3RydWN0IGEgZGlmZmVyZW50IGNvbnRyb2wgZm9yIHRoaXMgY2FzZSB0byBpbmNsdWRlIGFueSBleHRyYVxuICAgICAgICAgICAgLy8gZnJhbWVzIGFkZGVkIGJ5IHRoZSBjb25zdHJ1Y3QgY2FsbC5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIFJlZmxlY3QuY29uc3RydWN0KEZha2UsIFtdKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFJlZmxlY3QuY29uc3RydWN0KGZuLCBbXSwgRmFrZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIEZha2UuY2FsbCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgICAgIH0gLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddIGZvdW5kIHdoZW4gdXBncmFkaW5nIEZsb3dcblxuXG4gICAgICAgICAgICBmbi5jYWxsKEZha2UucHJvdG90eXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgICAgfSAvLyBUT0RPKGx1bmEpOiBUaGlzIHdpbGwgY3VycmVudGx5IG9ubHkgdGhyb3cgaWYgdGhlIGZ1bmN0aW9uIGNvbXBvbmVudFxuICAgICAgICAgIC8vIHRyaWVzIHRvIGFjY2VzcyBSZWFjdC9SZWFjdERPTS9wcm9wcy4gV2Ugc2hvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyB0aHJvd1xuICAgICAgICAgIC8vIGluIHNpbXBsZSBjb21wb25lbnRzIHRvb1xuXG5cbiAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gZm4oKTsgLy8gSWYgdGhlIGZ1bmN0aW9uIGNvbXBvbmVudCByZXR1cm5zIGEgcHJvbWlzZSwgaXQncyBsaWtlbHkgYW4gYXN5bmNcbiAgICAgICAgICAvLyBjb21wb25lbnQsIHdoaWNoIHdlIGRvbid0IHlldCBzdXBwb3J0LiBBdHRhY2ggYSBub29wIGNhdGNoIGhhbmRsZXIgdG9cbiAgICAgICAgICAvLyBzaWxlbmNlIHRoZSBlcnJvci5cbiAgICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnQgY29tcG9uZW50IHN0YWNrcyBmb3IgYXN5bmMgY2xpZW50IGNvbXBvbmVudHM/XG5cbiAgICAgICAgICBpZiAobWF5YmVQcm9taXNlICYmIHR5cGVvZiBtYXliZVByb21pc2UuY2F0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZS5jYXRjaChmdW5jdGlvbiAoKSB7fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChzYW1wbGUpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbmxpbmVkIG1hbnVhbGx5IGJlY2F1c2UgY2xvc3VyZSBkb2Vzbid0IGRvIGl0IGZvciB1cy5cbiAgICAgICAgaWYgKHNhbXBsZSAmJiBjb250cm9sICYmIHR5cGVvZiBzYW1wbGUuc3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIFtzYW1wbGUuc3RhY2ssIGNvbnRyb2wuc3RhY2tdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgfVxuICB9OyAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cblxuICBSdW5JblJvb3RGcmFtZS5EZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3QuZGlzcGxheU5hbWUgPSAnRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290JztcbiAgdmFyIG5hbWVQcm9wRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoUnVuSW5Sb290RnJhbWUuRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290LCAnbmFtZScpOyAvLyBCZWZvcmUgRVM2LCB0aGUgYG5hbWVgIHByb3BlcnR5IHdhcyBub3QgY29uZmlndXJhYmxlLlxuXG4gIGlmIChuYW1lUHJvcERlc2NyaXB0b3IgJiYgbmFtZVByb3BEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgIC8vIFY4IHV0aWxpemVzIGEgZnVuY3Rpb24ncyBgbmFtZWAgcHJvcGVydHkgd2hlbiBnZW5lcmF0aW5nIGEgc3RhY2sgdHJhY2UuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJ1bkluUm9vdEZyYW1lLkRldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdCwgLy8gQ29uZmlndXJhYmxlIHByb3BlcnRpZXMgY2FuIGJlIHVwZGF0ZWQgZXZlbiBpZiBpdHMgd3JpdGFibGUgZGVzY3JpcHRvclxuICAgIC8vIGlzIHNldCB0byBgZmFsc2VgLlxuICAgIC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXVxuICAgICduYW1lJywge1xuICAgICAgdmFsdWU6ICdEZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3QnXG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBfUnVuSW5Sb290RnJhbWUkRGV0ZXIgPSBSdW5JblJvb3RGcmFtZS5EZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3QoKSxcbiAgICAgICAgc2FtcGxlU3RhY2sgPSBfUnVuSW5Sb290RnJhbWUkRGV0ZXJbMF0sXG4gICAgICAgIGNvbnRyb2xTdGFjayA9IF9SdW5JblJvb3RGcmFtZSREZXRlclsxXTtcblxuICAgIGlmIChzYW1wbGVTdGFjayAmJiBjb250cm9sU3RhY2spIHtcbiAgICAgIC8vIFRoaXMgZXh0cmFjdHMgdGhlIGZpcnN0IGZyYW1lIGZyb20gdGhlIHNhbXBsZSB0aGF0IGlzbid0IGFsc28gaW4gdGhlIGNvbnRyb2wuXG4gICAgICAvLyBTa2lwcGluZyBvbmUgZnJhbWUgdGhhdCB3ZSBhc3N1bWUgaXMgdGhlIGZyYW1lIHRoYXQgY2FsbHMgdGhlIHR3by5cbiAgICAgIHZhciBzYW1wbGVMaW5lcyA9IHNhbXBsZVN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHZhciBjb250cm9sTGluZXMgPSBjb250cm9sU3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgdmFyIHMgPSAwO1xuICAgICAgdmFyIGMgPSAwO1xuXG4gICAgICB3aGlsZSAocyA8IHNhbXBsZUxpbmVzLmxlbmd0aCAmJiAhc2FtcGxlTGluZXNbc10uaW5jbHVkZXMoJ0RldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdCcpKSB7XG4gICAgICAgIHMrKztcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGMgPCBjb250cm9sTGluZXMubGVuZ3RoICYmICFjb250cm9sTGluZXNbY10uaW5jbHVkZXMoJ0RldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdCcpKSB7XG4gICAgICAgIGMrKztcbiAgICAgIH0gLy8gV2UgY291bGRuJ3QgZmluZCBvdXIgaW50ZW50aW9uYWxseSBpbmplY3RlZCBjb21tb24gcm9vdCBmcmFtZSwgYXR0ZW1wdFxuICAgICAgLy8gdG8gZmluZCBhbm90aGVyIGNvbW1vbiByb290IGZyYW1lIGJ5IHNlYXJjaCBmcm9tIHRoZSBib3R0b20gb2YgdGhlXG4gICAgICAvLyBjb250cm9sIHN0YWNrLi4uXG5cblxuICAgICAgaWYgKHMgPT09IHNhbXBsZUxpbmVzLmxlbmd0aCB8fCBjID09PSBjb250cm9sTGluZXMubGVuZ3RoKSB7XG4gICAgICAgIHMgPSBzYW1wbGVMaW5lcy5sZW5ndGggLSAxO1xuICAgICAgICBjID0gY29udHJvbExpbmVzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgd2hpbGUgKHMgPj0gMSAmJiBjID49IDAgJiYgc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgIC8vIFdlIGV4cGVjdCBhdCBsZWFzdCBvbmUgc3RhY2sgZnJhbWUgdG8gYmUgc2hhcmVkLlxuICAgICAgICAgIC8vIFR5cGljYWxseSB0aGlzIHdpbGwgYmUgdGhlIHJvb3QgbW9zdCBvbmUuIEhvd2V2ZXIsIHN0YWNrIGZyYW1lcyBtYXkgYmVcbiAgICAgICAgICAvLyBjdXQgb2ZmIGR1ZSB0byBtYXhpbXVtIHN0YWNrIGxpbWl0cy4gSW4gdGhpcyBjYXNlLCBvbmUgbWF5YmUgY3V0IG9mZlxuICAgICAgICAgIC8vIGVhcmxpZXIgdGhhbiB0aGUgb3RoZXIuIFdlIGFzc3VtZSB0aGF0IHRoZSBzYW1wbGUgaXMgbG9uZ2VyIG9yIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYW5kIHRoZXJlIGZvciBjdXQgb2ZmIGVhcmxpZXIuIFNvIHdlIHNob3VsZCBmaW5kIHRoZSByb290IG1vc3QgZnJhbWUgaW5cbiAgICAgICAgICAvLyB0aGUgc2FtcGxlIHNvbWV3aGVyZSBpbiB0aGUgY29udHJvbC5cbiAgICAgICAgICBjLS07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICg7IHMgPj0gMSAmJiBjID49IDA7IHMtLSwgYy0tKSB7XG4gICAgICAgIC8vIE5leHQgd2UgZmluZCB0aGUgZmlyc3Qgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgd2hpY2ggc2hvdWxkIGJlIHRoZVxuICAgICAgICAvLyBmcmFtZSB0aGF0IGNhbGxlZCBvdXIgc2FtcGxlIGZ1bmN0aW9uIGFuZCB0aGUgY29udHJvbC5cbiAgICAgICAgaWYgKHNhbXBsZUxpbmVzW3NdICE9PSBjb250cm9sTGluZXNbY10pIHtcbiAgICAgICAgICAvLyBJbiBWOCwgdGhlIGZpcnN0IGxpbmUgaXMgZGVzY3JpYmluZyB0aGUgbWVzc2FnZSBidXQgb3RoZXIgVk1zIGRvbid0LlxuICAgICAgICAgIC8vIElmIHdlJ3JlIGFib3V0IHRvIHJldHVybiB0aGUgZmlyc3QgbGluZSwgYW5kIHRoZSBjb250cm9sIGlzIGFsc28gb24gdGhlIHNhbWVcbiAgICAgICAgICAvLyBsaW5lLCB0aGF0J3MgYSBwcmV0dHkgZ29vZCBpbmRpY2F0b3IgdGhhdCBvdXIgc2FtcGxlIHRocmV3IGF0IHNhbWUgbGluZSBhc1xuICAgICAgICAgIC8vIHRoZSBjb250cm9sLiBJLmUuIGJlZm9yZSB3ZSBlbnRlcmVkIHRoZSBzYW1wbGUgZnJhbWUuIFNvIHdlIGlnbm9yZSB0aGlzIHJlc3VsdC5cbiAgICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgeW91IHBhc3NlZCBhIGNsYXNzIHRvIGZ1bmN0aW9uIGNvbXBvbmVudCwgb3Igbm9uLWZ1bmN0aW9uLlxuICAgICAgICAgIGlmIChzICE9PSAxIHx8IGMgIT09IDEpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgcy0tO1xuICAgICAgICAgICAgICBjLS07IC8vIFdlIG1heSBzdGlsbCBoYXZlIHNpbWlsYXIgaW50ZXJtZWRpYXRlIGZyYW1lcyBmcm9tIHRoZSBjb25zdHJ1Y3QgY2FsbC5cbiAgICAgICAgICAgICAgLy8gVGhlIG5leHQgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgc2hvdWxkIGJlIG91ciBtYXRjaCB0aG91Z2guXG5cbiAgICAgICAgICAgICAgaWYgKGMgPCAwIHx8IHNhbXBsZUxpbmVzW3NdICE9PSBjb250cm9sTGluZXNbY10pIHtcbiAgICAgICAgICAgICAgICAvLyBWOCBhZGRzIGEgXCJuZXdcIiBwcmVmaXggZm9yIG5hdGl2ZSBjbGFzc2VzLiBMZXQncyByZW1vdmUgaXQgdG8gbWFrZSBpdCBwcmV0dGllci5cbiAgICAgICAgICAgICAgICB2YXIgX2ZyYW1lID0gJ1xcbicgKyBzYW1wbGVMaW5lc1tzXS5yZXBsYWNlKCcgYXQgbmV3ICcsICcgYXQgJyk7IC8vIElmIG91ciBjb21wb25lbnQgZnJhbWUgaXMgbGFiZWxlZCBcIjxhbm9ueW1vdXM+XCJcbiAgICAgICAgICAgICAgICAvLyBidXQgd2UgaGF2ZSBhIHVzZXItcHJvdmlkZWQgXCJkaXNwbGF5TmFtZVwiXG4gICAgICAgICAgICAgICAgLy8gc3BsaWNlIGl0IGluIHRvIG1ha2UgdGhlIHN0YWNrIG1vcmUgcmVhZGFibGUuXG5cblxuICAgICAgICAgICAgICAgIGlmIChmbi5kaXNwbGF5TmFtZSAmJiBfZnJhbWUuaW5jbHVkZXMoJzxhbm9ueW1vdXM+JykpIHtcbiAgICAgICAgICAgICAgICAgIF9mcmFtZSA9IF9mcmFtZS5yZXBsYWNlKCc8YW5vbnltb3VzPicsIGZuLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgX2ZyYW1lKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIFJldHVybiB0aGUgbGluZSB3ZSBmb3VuZC5cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mcmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgcmVlbnRyeSA9IGZhbHNlO1xuXG4gICAge1xuICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50ID0gcHJldmlvdXNEaXNwYXRjaGVyO1xuICAgICAgcmVlbmFibGVMb2dzKCk7XG4gICAgfVxuXG4gICAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlO1xuICB9IC8vIEZhbGxiYWNrIHRvIGp1c3QgdXNpbmcgdGhlIG5hbWUgaWYgd2UgY291bGRuJ3QgbWFrZSBpdCB0aHJvdy5cblxuXG4gIHZhciBuYW1lID0gZm4gPyBmbi5kaXNwbGF5TmFtZSB8fCBmbi5uYW1lIDogJyc7XG4gIHZhciBzeW50aGV0aWNGcmFtZSA9IG5hbWUgPyBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lKSA6ICcnO1xuXG4gIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgc3ludGhldGljRnJhbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzeW50aGV0aWNGcmFtZTtcbn1cbmZ1bmN0aW9uIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZShmbiwgb3duZXJGbikge1xuICB7XG4gICAgcmV0dXJuIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRDb25zdHJ1Y3QoQ29tcG9uZW50KSB7XG4gIHZhciBwcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuICByZXR1cm4gISEocHJvdG90eXBlICYmIHByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKHR5cGUsIG93bmVyRm4pIHtcblxuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAge1xuICAgICAgcmV0dXJuIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUodHlwZSwgc2hvdWxkQ29uc3RydWN0KHR5cGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKHR5cGUpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKCdTdXNwZW5zZScpO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU6XG4gICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlTGlzdCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKHR5cGUucmVuZGVyKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIC8vIE1lbW8gbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgIHJldHVybiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZS50eXBlLCBvd25lckZuKTtcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IHR5cGU7XG4gICAgICAgICAgdmFyIHBheWxvYWQgPSBsYXp5Q29tcG9uZW50Ll9wYXlsb2FkO1xuICAgICAgICAgIHZhciBpbml0ID0gbGF6eUNvbXBvbmVudC5faW5pdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBMYXp5IG1heSBjb250YWluIGFueSBjb21wb25lbnQgdHlwZSBzbyB3ZSByZWN1cnNpdmVseSByZXNvbHZlIGl0LlxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihpbml0KHBheWxvYWQpLCBvd25lckZuKTtcbiAgICAgICAgICB9IGNhdGNoICh4KSB7fVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdEN1cnJlbnRPd25lcjtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbnZhciBSRUFDVF9DTElFTlRfUkVGRVJFTkNFID0gU3ltYm9sLmZvcigncmVhY3QuY2xpZW50LnJlZmVyZW5jZScpO1xudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duO1xudmFyIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xudmFyIGRpZFdhcm5BYm91dFN0cmluZ1JlZnM7XG5cbntcbiAgZGlkV2FybkFib3V0U3RyaW5nUmVmcyA9IHt9O1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG5cbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG5cbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnLCBzZWxmKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5yZWYgPT09ICdzdHJpbmcnICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgc2VsZiAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnN0YXRlTm9kZSAhPT0gc2VsZikge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKCFkaWRXYXJuQWJvdXRTdHJpbmdSZWZzW2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgIGVycm9yKCdDb21wb25lbnQgXCIlc1wiIGNvbnRhaW5zIHRoZSBzdHJpbmcgcmVmIFwiJXNcIi4gJyArICdTdXBwb3J0IGZvciBzdHJpbmcgcmVmcyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gJyArICdUaGlzIGNhc2UgY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIHRvIGFuIGFycm93IGZ1bmN0aW9uLiAnICsgJ1dlIGFzayB5b3UgdG8gbWFudWFsbHkgZml4IHRoaXMgY2FzZSBieSB1c2luZyB1c2VSZWYoKSBvciBjcmVhdGVSZWYoKSBpbnN0ZWFkLiAnICsgJ0xlYXJuIG1vcmUgYWJvdXQgdXNpbmcgcmVmcyBzYWZlbHkgaGVyZTogJyArICdodHRwczovL3JlYWN0LmRldi9saW5rL3N0cmljdC1tb2RlLXN0cmluZy1yZWYnLCBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKSwgY29uZmlnLnJlZik7XG5cbiAgICAgICAgZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAge1xuICAgIHtcbiAgICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgICBlcnJvcignJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL3JlYWN0LmRldi9saW5rL3NwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIG5vdCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBpbnRlcm5hbFxuICovXG5cblxuZnVuY3Rpb24gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgX3JlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIHJlZjtcblxuICB7XG4gICAgcmVmID0gX3JlZjtcbiAgfVxuXG4gIHZhciBlbGVtZW50O1xuXG4gIHtcbiAgICAvLyBJbiBwcm9kLCBgcmVmYCBpcyBhIHJlZ3VsYXIgcHJvcGVydHkuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiBhXG4gICAgLy8gZnV0dXJlIHJlbGVhc2UuXG4gICAgZWxlbWVudCA9IHtcbiAgICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBrZXk6IGtleSxcbiAgICAgIHJlZjogcmVmLFxuICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICAgIF9vd25lcjogb3duZXJcbiAgICB9O1xuICB9XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9OyAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0pOyAvLyBkZWJ1Z0luZm8gY29udGFpbnMgU2VydmVyIENvbXBvbmVudCBkZWJ1ZyBpbmZvcm1hdGlvbi5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX2RlYnVnSW5mbycsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9KTtcblxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHtcbiAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSkge1xuICAgICAgLy8gVGhpcyBpcyBhbiBpbnZhbGlkIGVsZW1lbnQgdHlwZS5cbiAgICAgIC8vXG4gICAgICAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAgICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICAgIHZhciBpbmZvID0gJyc7XG5cbiAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlU3RyaW5nO1xuXG4gICAgICBpZiAodHlwZSA9PT0gbnVsbCkge1xuICAgICAgICB0eXBlU3RyaW5nID0gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHR5cGUpKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSBcIjxcIiArIChnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZS50eXBlKSB8fCAnVW5rbm93bicpICsgXCIgLz5cIjtcbiAgICAgICAgaW5mbyA9ICcgRGlkIHlvdSBhY2NpZGVudGFsbHkgZXhwb3J0IGEgSlNYIGxpdGVyYWwgaW5zdGVhZCBvZiBhIGNvbXBvbmVudD8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZVN0cmluZyA9IHR5cGVvZiB0eXBlO1xuICAgICAgfVxuXG4gICAgICBlcnJvcignUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlU3RyaW5nLCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhpcyBpcyBhIHZhbGlkIGVsZW1lbnQgdHlwZS5cbiAgICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZ1xuICAgICAgLy8gZXJyb3JzLiBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kXG4gICAgICAvLyBwcm9kLiAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGVcbiAgICAgIC8vIHR5cGUgaXMgZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9IC8vIFVubGlrZSB0aGUganN4KCkgcnVudGltZSwgY3JlYXRlRWxlbWVudCgpIGRvZXNuJ3Qgd2FybiBhYm91dCBrZXkgc3ByZWFkLlxuXG4gIH1cblxuICB2YXIgcHJvcE5hbWU7IC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcblxuICB2YXIgcHJvcHMgPSB7fTtcbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICB7XG4gICAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICB9XG5cbiAgICAgIHtcbiAgICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgY29uZmlnLl9fc2VsZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjb25maWcua2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH0gLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuXG5cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgLy8gU2tpcCBvdmVyIHJlc2VydmVkIHByb3AgbmFtZXNcbiAgICAgIHByb3BOYW1lICE9PSAna2V5JyAmJiAocHJvcE5hbWUgIT09ICdyZWYnKSAmJiAvLyBFdmVuIHRob3VnaCB3ZSBkb24ndCB1c2UgdGhlc2UgYW55bW9yZSBpbiB0aGUgcnVudGltZSwgd2UgZG9uJ3Qgd2FudFxuICAgICAgLy8gdGhlbSB0byBhcHBlYXIgYXMgcHJvcHMsIHNvIGluIGNyZWF0ZUVsZW1lbnQgd2UgZmlsdGVyIHRoZW0gb3V0LlxuICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSB0byBkbyB0aGlzIGluIHRoZSBqc3goKSBydW50aW1lIGJlY2F1c2UgdGhlIGpzeCgpXG4gICAgICAvLyB0cmFuc2Zvcm0gbmV2ZXIgcGFzc2VkIHRoZXNlIGFzIHByb3BzOyBpdCB1c2VkIHNlcGFyYXRlIGFyZ3VtZW50cy5cbiAgICAgIHByb3BOYW1lICE9PSAnX19zZWxmJyAmJiBwcm9wTmFtZSAhPT0gJ19fc291cmNlJykge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuXG5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG5cbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBjaGlsZHJlbkxlbmd0aDsgX2krKykge1xuICAgICAgY2hpbGRBcnJheVtfaV0gPSBhcmd1bWVudHNbX2kgKyAyXTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcblxuICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxudmFyIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gZmFsc2U7XG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2NyZWF0ZWZhY3RvcnlcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5KHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBjcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7IC8vIEV4cG9zZSB0aGUgdHlwZSBvbiB0aGUgZmFjdG9yeSBhbmQgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBlYXNpbHkgYWNjZXNzZWQgb24gZWxlbWVudHMuIEUuZy4gYDxGb28gLz4udHlwZSA9PT0gRm9vYC5cbiAgLy8gVGhpcyBzaG91bGQgbm90IGJlIG5hbWVkIGBjb25zdHJ1Y3RvcmAgc2luY2UgdGhpcyBtYXkgbm90IGJlIHRoZSBmdW5jdGlvblxuICAvLyB0aGF0IGNyZWF0ZWQgdGhlIGVsZW1lbnQsIGFuZCBpdCBtYXkgbm90IGV2ZW4gYmUgYSBjb25zdHJ1Y3Rvci5cbiAgLy8gTGVnYWN5IGhvb2s6IHJlbW92ZSBpdFxuXG4gIGZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAge1xuICAgIGlmICghZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkpIHtcbiAgICAgIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gdHJ1ZTtcblxuICAgICAgd2FybignUmVhY3QuY3JlYXRlRmFjdG9yeSgpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIENvbnNpZGVyIHVzaW5nIEpTWCAnICsgJ29yIHVzZSBSZWFjdC5jcmVhdGVFbGVtZW50KCkgZGlyZWN0bHkgaW5zdGVhZC4nKTtcbiAgICB9IC8vIExlZ2FjeSBob29rOiByZW1vdmUgaXRcblxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZhY3RvcnksICd0eXBlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybignRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZmFjdG9yeTtcbn1cbmZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgcmV0dXJuIFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgLy8gV2hlbiBlbmFibGVSZWZBc1Byb3AgaXMgb24sIHRoaXMgYXJndW1lbnQgaXMgaWdub3JlZC4gVGhpcyBjaGVjayBvbmx5XG4gIC8vIGV4aXN0cyB0byBhdm9pZCB0aGUgYHJlZmAgYWNjZXNzIHdhcm5pbmcuXG4gIG9sZEVsZW1lbnQucmVmLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xufVxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY2xvbmVlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gY2xvbmVFbGVtZW50KGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCBcIiArIGVsZW1lbnQgKyBcIi5cIik7XG4gIH1cblxuICB2YXIgcHJvcE5hbWU7IC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcblxuICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7IC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAge1xuICAgICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIH1cblxuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cblxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICB7XG4gICAgICAgIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY29uZmlnLmtleSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG5cblxuICAgIHZhciBkZWZhdWx0UHJvcHM7XG5cbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmIC8vIFNraXAgb3ZlciByZXNlcnZlZCBwcm9wIG5hbWVzXG4gICAgICBwcm9wTmFtZSAhPT0gJ2tleScgJiYgKHByb3BOYW1lICE9PSAncmVmJykgJiYgLy8gLi4uYW5kIG1heWJlIHRoZXNlLCB0b28sIHRob3VnaCB3ZSBjdXJyZW50bHkgcmVseSBvbiB0aGVtIGZvclxuICAgICAgLy8gd2FybmluZ3MgYW5kIGRlYnVnIGluZm9ybWF0aW9uIGluIGRldi4gTmVlZCB0byBkZWNpZGUgaWYgd2UncmUgT0tcbiAgICAgIC8vIHdpdGggZHJvcHBpbmcgdGhlbS4gSW4gdGhlIGpzeCgpIHJ1bnRpbWUgaXQncyBub3QgYW4gaXNzdWUgYmVjYXVzZVxuICAgICAgLy8gdGhlIGRhdGEgZ2V0cyBwYXNzZWQgYXMgc2VwYXJhdGUgYXJndW1lbnRzIGluc3RlYWQgb2YgcHJvcHMsIGJ1dFxuICAgICAgLy8gaXQgd291bGQgYmUgbmljZSB0byBzdG9wIHJlbHlpbmcgb24gdGhlbSBlbnRpcmVseSBzbyB3ZSBjYW4gZHJvcFxuICAgICAgLy8gdGhlbSBmcm9tIHRoZSBpbnRlcm5hbCBGaWJlciBmaWVsZC5cbiAgICAgIHByb3BOYW1lICE9PSAnX19zZWxmJyAmJiBwcm9wTmFtZSAhPT0gJ19fc291cmNlJyAmJiAvLyBVbmRlZmluZWQgYHJlZmAgaXMgaWdub3JlZCBieSBjbG9uZUVsZW1lbnQuIFdlIHRyZWF0IGl0IHRoZSBzYW1lIGFzXG4gICAgICAvLyBpZiB0aGUgcHJvcGVydHkgd2VyZSBtaXNzaW5nLiBUaGlzIGlzIG1vc3RseSBmb3JcbiAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgICAgIShlbmFibGVSZWZBc1Byb3AgICkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuXG5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG5cbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuXG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgdmFyIGNsb25lZEVsZW1lbnQgPSBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG93bmVyLCBwcm9wcyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMjsgX2kyIDwgYXJndW1lbnRzLmxlbmd0aDsgX2kyKyspIHtcbiAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbX2kyXSwgY2xvbmVkRWxlbWVudC50eXBlKTtcbiAgfVxuXG4gIHJldHVybiBjbG9uZWRFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIHtcbiAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnIHx8ICFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuJCR0eXBlb2YgPT09IFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0UpIDsgZWxzZSBpZiAoaXNBcnJheShub2RlKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG5cbiAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBFbnRyeSBpdGVyYXRvcnMgdXNlZCB0byBwcm92aWRlIGltcGxpY2l0IGtleXMsXG4gICAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2lzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIEBmaW5hbFxuICovXG5cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICB7XG4gICAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuXG4gICAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7IC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gICAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAgIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cblxuICAgIHZhciBjaGlsZE93bmVyID0gJyc7XG5cbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgICBjaGlsZE93bmVyID0gXCIgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gXCIgKyBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoZWxlbWVudC5fb3duZXIudHlwZSkgKyBcIi5cIjtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KTtcblxuICAgIGVycm9yKCdFYWNoIGNoaWxkIGluIGEgbGlzdCBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL3JlYWN0LmRldi9saW5rL3dhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyKTtcblxuICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIHZhciBzdGFjayA9IGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihlbGVtZW50LnR5cGUsIG93bmVyID8gb3duZXIudHlwZSA6IG51bGwpO1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5zZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLnNldEV4dHJhU3RhY2tGcmFtZShudWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHtcbiAgICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICB2YXIgcGFyZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShwYXJlbnRUeXBlKTtcblxuICAgICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgICAgaW5mbyA9IFwiXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8XCIgKyBwYXJlbnROYW1lICsgXCI+LlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmZvO1xuICB9XG59XG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIHJlbmRlciBwaGFzZSBpbnN0ZWFkIG9mIGF0IGVsZW1lbnQgY3JlYXRpb24uXG4gIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChmcmFnbWVudCk7XG5cbiAgICAgICAgZXJyb3IoJ0ludmFsaWQgcHJvcCBgJXNgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuICcgKyAnUmVhY3QuRnJhZ21lbnQgY2FuIG9ubHkgaGF2ZSBga2V5YCBhbmQgYGNoaWxkcmVuYCBwcm9wcy4nLCBrZXkpO1xuXG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChmcmFnbWVudCk7XG5cbiAgICAgIGVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBgcmVmYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLicpO1xuXG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0ga2V5LnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcblxuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgZWxlbWVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBlbGVtZW50IEEgZWxlbWVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0RWxlbWVudEtleShlbGVtZW50LCBpbmRleCkge1xuICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAvLyBFeHBsaWNpdCBrZXlcbiAgICB7XG4gICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKGVsZW1lbnQua2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXNjYXBlKCcnICsgZWxlbWVudC5rZXkpO1xuICB9IC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG5cblxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG5mdW5jdGlvbiBub29wJDEoKSB7fVxuXG5mdW5jdGlvbiByZXNvbHZlVGhlbmFibGUodGhlbmFibGUpIHtcbiAgc3dpdGNoICh0aGVuYWJsZS5zdGF0dXMpIHtcbiAgICBjYXNlICdmdWxmaWxsZWQnOlxuICAgICAge1xuICAgICAgICB2YXIgZnVsZmlsbGVkVmFsdWUgPSB0aGVuYWJsZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGZ1bGZpbGxlZFZhbHVlO1xuICAgICAgfVxuXG4gICAgY2FzZSAncmVqZWN0ZWQnOlxuICAgICAge1xuICAgICAgICB2YXIgcmVqZWN0ZWRFcnJvciA9IHRoZW5hYmxlLnJlYXNvbjtcbiAgICAgICAgdGhyb3cgcmVqZWN0ZWRFcnJvcjtcbiAgICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhlbmFibGUuc3RhdHVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIE9ubHkgaW5zdHJ1bWVudCB0aGUgdGhlbmFibGUgaWYgdGhlIHN0YXR1cyBpZiBub3QgZGVmaW5lZC4gSWZcbiAgICAgICAgICAvLyBpdCdzIGRlZmluZWQsIGJ1dCBhbiB1bmtub3duIHZhbHVlLCBhc3N1bWUgaXQncyBiZWVuIGluc3RydW1lbnRlZCBieVxuICAgICAgICAgIC8vIHNvbWUgY3VzdG9tIHVzZXJzcGFjZSBpbXBsZW1lbnRhdGlvbi4gV2UgdHJlYXQgaXQgYXMgXCJwZW5kaW5nXCIuXG4gICAgICAgICAgLy8gQXR0YWNoIGEgZHVtbXkgbGlzdGVuZXIsIHRvIGVuc3VyZSB0aGF0IGFueSBsYXp5IGluaXRpYWxpemF0aW9uIGNhblxuICAgICAgICAgIC8vIGhhcHBlbi4gRmxpZ2h0IGxhemlseSBwYXJzZXMgSlNPTiB3aGVuIHRoZSB2YWx1ZSBpcyBhY3R1YWxseSBhd2FpdGVkLlxuICAgICAgICAgIHRoZW5hYmxlLnRoZW4obm9vcCQxLCBub29wJDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYW4gdW5jYWNoZWQgdGhlbmFibGUgdGhhdCB3ZSBoYXZlbid0IHNlZW4gYmVmb3JlLlxuICAgICAgICAgIC8vIFRPRE86IERldGVjdCBpbmZpbml0ZSBwaW5nIGxvb3BzIGNhdXNlZCBieSB1bmNhY2hlZCBwcm9taXNlcy5cbiAgICAgICAgICB2YXIgcGVuZGluZ1RoZW5hYmxlID0gdGhlbmFibGU7XG4gICAgICAgICAgcGVuZGluZ1RoZW5hYmxlLnN0YXR1cyA9ICdwZW5kaW5nJztcbiAgICAgICAgICBwZW5kaW5nVGhlbmFibGUudGhlbihmdW5jdGlvbiAoZnVsZmlsbGVkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGVuYWJsZS5zdGF0dXMgPT09ICdwZW5kaW5nJykge1xuICAgICAgICAgICAgICB2YXIgZnVsZmlsbGVkVGhlbmFibGUgPSB0aGVuYWJsZTtcbiAgICAgICAgICAgICAgZnVsZmlsbGVkVGhlbmFibGUuc3RhdHVzID0gJ2Z1bGZpbGxlZCc7XG4gICAgICAgICAgICAgIGZ1bGZpbGxlZFRoZW5hYmxlLnZhbHVlID0gZnVsZmlsbGVkVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAodGhlbmFibGUuc3RhdHVzID09PSAncGVuZGluZycpIHtcbiAgICAgICAgICAgICAgdmFyIHJlamVjdGVkVGhlbmFibGUgPSB0aGVuYWJsZTtcbiAgICAgICAgICAgICAgcmVqZWN0ZWRUaGVuYWJsZS5zdGF0dXMgPSAncmVqZWN0ZWQnO1xuICAgICAgICAgICAgICByZWplY3RlZFRoZW5hYmxlLnJlYXNvbiA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IC8vIENoZWNrIG9uZSBtb3JlIHRpbWUgaW4gY2FzZSB0aGUgdGhlbmFibGUgcmVzb2x2ZWQgc3luY2hyb25vdXNseS5cblxuXG4gICAgICAgIHN3aXRjaCAodGhlbmFibGUuc3RhdHVzKSB7XG4gICAgICAgICAgY2FzZSAnZnVsZmlsbGVkJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGZ1bGZpbGxlZFRoZW5hYmxlID0gdGhlbmFibGU7XG4gICAgICAgICAgICAgIHJldHVybiBmdWxmaWxsZWRUaGVuYWJsZS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgJ3JlamVjdGVkJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIHJlamVjdGVkVGhlbmFibGUgPSB0aGVuYWJsZTtcbiAgICAgICAgICAgICAgdmFyIF9yZWplY3RlZEVycm9yID0gcmVqZWN0ZWRUaGVuYWJsZS5yZWFzb247XG4gICAgICAgICAgICAgIHRocm93IF9yZWplY3RlZEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICB0aHJvdyB0aGVuYWJsZTtcbn1cblxuZnVuY3Rpb24gbWFwSW50b0FycmF5KGNoaWxkcmVuLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgbmFtZVNvRmFyLCBjYWxsYmFjaykge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgdmFyIGludm9rZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIC8vIGZhbGx0aHJvdWdoIGZvciBlbmFibGVkIEJpZ0ludCBzdXBwb3J0XG5cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBzd2l0Y2ggKGNoaWxkcmVuLiQkdHlwZW9mKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IGNoaWxkcmVuLl9wYXlsb2FkO1xuICAgICAgICAgICAgdmFyIGluaXQgPSBjaGlsZHJlbi5faW5pdDtcbiAgICAgICAgICAgIHJldHVybiBtYXBJbnRvQXJyYXkoaW5pdChwYXlsb2FkKSwgYXJyYXksIGVzY2FwZWRQcmVmaXgsIG5hbWVTb0ZhciwgY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICB2YXIgX2NoaWxkID0gY2hpbGRyZW47XG4gICAgdmFyIG1hcHBlZENoaWxkID0gY2FsbGJhY2soX2NoaWxkKTsgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzOlxuXG4gICAgdmFyIGNoaWxkS2V5ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldEVsZW1lbnRLZXkoX2NoaWxkLCAwKSA6IG5hbWVTb0ZhcjtcblxuICAgIGlmIChpc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgICAgdmFyIGVzY2FwZWRDaGlsZEtleSA9ICcnO1xuXG4gICAgICBpZiAoY2hpbGRLZXkgIT0gbnVsbCkge1xuICAgICAgICBlc2NhcGVkQ2hpbGRLZXkgPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoY2hpbGRLZXkpICsgJy8nO1xuICAgICAgfVxuXG4gICAgICBtYXBJbnRvQXJyYXkobWFwcGVkQ2hpbGQsIGFycmF5LCBlc2NhcGVkQ2hpbGRLZXksICcnLCBmdW5jdGlvbiAoYykge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgICB7XG4gICAgICAgICAgLy8gVGhlIGBpZmAgc3RhdGVtZW50IGhlcmUgcHJldmVudHMgYXV0by1kaXNhYmxpbmcgb2YgdGhlIHNhZmVcbiAgICAgICAgICAvLyBjb2VyY2lvbiBFU0xpbnQgcnVsZSwgc28gd2UgbXVzdCBtYW51YWxseSBkaXNhYmxlIGl0IGJlbG93LlxuICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdIEZsb3cgaW5jb3JyZWN0bHkgdGhpbmtzIFJlYWN0LlBvcnRhbCBkb2Vzbid0IGhhdmUgYSBrZXlcbiAgICAgICAgICBpZiAobWFwcGVkQ2hpbGQua2V5ICYmICghX2NoaWxkIHx8IF9jaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkpIHtcbiAgICAgICAgICAgIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24obWFwcGVkQ2hpbGQua2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtYXBwZWRDaGlsZCA9IGNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCwgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICAgIGVzY2FwZWRQcmVmaXggKyAoIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdIEZsb3cgaW5jb3JyZWN0bHkgdGhpbmtzIFJlYWN0LlBvcnRhbCBkb2Vzbid0IGhhdmUgYSBrZXlcbiAgICAgICAgbWFwcGVkQ2hpbGQua2V5ICYmICghX2NoaWxkIHx8IF9jaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoIC8vICRGbG93Rml4TWVbdW5zYWZlLWFkZGl0aW9uXVxuICAgICAgICAnJyArIG1hcHBlZENoaWxkLmtleSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG4gICAgICAgICkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgICB9XG5cbiAgICAgIGFycmF5LnB1c2gobWFwcGVkQ2hpbGQpO1xuICAgIH1cblxuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKGlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRFbGVtZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSBtYXBJbnRvQXJyYXkoY2hpbGQsIGFycmF5LCBlc2NhcGVkUHJlZml4LCBuZXh0TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgaXRlcmFibGVDaGlsZHJlbiA9IGNoaWxkcmVuO1xuXG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gaXRlcmFibGVDaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRNYXBzKSB7XG4gICAgICAgICAgICB3YXJuKCdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnVXNlIGFuIGFycmF5IG9mIGtleWVkIFJlYWN0RWxlbWVudHMgaW5zdGVhZC4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoaXRlcmFibGVDaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBpaSA9IDA7IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV0gYGl0ZXJhdG9yRm5gIG1pZ2h0IHJldHVybiBudWxsIGFjY29yZGluZyB0byB0eXBpbmcuXG5cbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0RWxlbWVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgIHN1YnRyZWVDb3VudCArPSBtYXBJbnRvQXJyYXkoY2hpbGQsIGFycmF5LCBlc2NhcGVkUHJlZml4LCBuZXh0TmFtZSwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4udGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbWFwSW50b0FycmF5KHJlc29sdmVUaGVuYWJsZShjaGlsZHJlbiksIGFycmF5LCBlc2NhcGVkUHJlZml4LCBuYW1lU29GYXIsIGNhbGxiYWNrKTtcbiAgICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG5cblxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gU3RyaW5nKGNoaWxkcmVuKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogXCIgKyAoY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nKSArIFwiKS4gXCIgKyAnSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIC8vICRGbG93Rml4TWUgbGltaXRhdGlvbiByZWZpbmluZyBhYnN0cmFjdCB0eXBlcyBpbiBGbG93XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgY291bnQgPSAwO1xuICBtYXBJbnRvQXJyYXkoY2hpbGRyZW4sIHJlc3VsdCwgJycsICcnLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBjb3VudCsrKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5jb3VudFxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5cblxuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbikge1xuICB2YXIgbiA9IDA7XG4gIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgbisrOyAvLyBEb24ndCByZXR1cm4gYW55dGhpbmdcbiAgfSk7XG4gIHJldHVybiBuO1xufVxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIC8vICRGbG93Rml4TWVbbWlzc2luZy10aGlzLWFubm90XVxuICBmdW5jdGlvbiAoKSB7XG4gICAgZm9yRWFjaEZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gRG9uJ3QgcmV0dXJuIGFueXRoaW5nLlxuICB9LCBmb3JFYWNoQ29udGV4dCk7XG59XG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbnRvYXJyYXlcbiAqL1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH0pIHx8IFtdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJyk7XG4gIH1cblxuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlKSB7XG4gIC8vIFRPRE86IFNlY29uZCBhcmd1bWVudCB1c2VkIHRvIGJlIGFuIG9wdGlvbmFsIGBjYWxjdWxhdGVDaGFuZ2VkQml0c2BcbiAgLy8gZnVuY3Rpb24uIFdhcm4gdG8gcmVzZXJ2ZSBmb3IgZnV0dXJlIHVzZT9cbiAgdmFyIGNvbnRleHQgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgIC8vIHNvbWUgcmVuZGVyZXJzIGFzIHByaW1hcnkgYW5kIG90aGVycyBhcyBzZWNvbmRhcnkuIFdlIG9ubHkgZXhwZWN0XG4gICAgLy8gdGhlcmUgdG8gYmUgdHdvIGNvbmN1cnJlbnQgcmVuZGVyZXJzIGF0IG1vc3Q6IFJlYWN0IE5hdGl2ZSAocHJpbWFyeSkgYW5kXG4gICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgLy8gU2Vjb25kYXJ5IHJlbmRlcmVycyBzdG9yZSB0aGVpciBjb250ZXh0IHZhbHVlcyBvbiBzZXBhcmF0ZSBmaWVsZHMuXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgLy8gVXNlZCB0byB0cmFjayBob3cgbWFueSBjb25jdXJyZW50IHJlbmRlcmVycyB0aGlzIGNvbnRleHQgY3VycmVudGx5XG4gICAgLy8gc3VwcG9ydHMgd2l0aGluIGluIGEgc2luZ2xlIHJlbmRlcmVyLiBTdWNoIGFzIHBhcmFsbGVsIHNlcnZlciByZW5kZXJpbmcuXG4gICAgX3RocmVhZENvdW50OiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsXG4gIH07XG5cbiAge1xuICAgIGNvbnRleHQuUHJvdmlkZXIgPSB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfUFJPVklERVJfVFlQRSxcbiAgICAgIF9jb250ZXh0OiBjb250ZXh0XG4gICAgfTtcblxuICAgIHtcbiAgICAgIHZhciBDb25zdW1lciA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAgICAgX2NvbnRleHQ6IGNvbnRleHRcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhDb25zdW1lciwge1xuICAgICAgICBQcm92aWRlcjoge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuUHJvdmlkZXI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChfUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuUHJvdmlkZXIgPSBfUHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfY3VycmVudFZhbHVlOiB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29udGV4dC5fY3VycmVudFZhbHVlID0gX2N1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9jdXJyZW50VmFsdWUyOiB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlMjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUyKSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfdGhyZWFkQ291bnQ6IHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0Ll90aHJlYWRDb3VudDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKF90aHJlYWRDb3VudCkge1xuICAgICAgICAgICAgY29udGV4dC5fdGhyZWFkQ291bnQgPSBfdGhyZWFkQ291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBDb25zdW1lcjoge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuQ29uc3VtZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXNwbGF5TmFtZToge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuZGlzcGxheU5hbWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkaXNwbGF5TmFtZSkge31cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb250ZXh0LkNvbnN1bWVyID0gQ29uc3VtZXI7XG4gICAgfVxuICB9XG5cbiAge1xuICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlciA9IG51bGw7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyMiA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gY29udGV4dDtcbn1cblxudmFyIFVuaW5pdGlhbGl6ZWQgPSAtMTtcbnZhciBQZW5kaW5nID0gMDtcbnZhciBSZXNvbHZlZCA9IDE7XG52YXIgUmVqZWN0ZWQgPSAyO1xuXG5mdW5jdGlvbiBsYXp5SW5pdGlhbGl6ZXIocGF5bG9hZCkge1xuICBpZiAocGF5bG9hZC5fc3RhdHVzID09PSBVbmluaXRpYWxpemVkKSB7XG4gICAgdmFyIGN0b3IgPSBwYXlsb2FkLl9yZXN1bHQ7XG4gICAgdmFyIHRoZW5hYmxlID0gY3RvcigpOyAvLyBUcmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlLlxuICAgIC8vIFRoaXMgbWlnaHQgdGhyb3cgZWl0aGVyIGJlY2F1c2UgaXQncyBtaXNzaW5nIG9yIHRocm93cy4gSWYgc28sIHdlIHRyZWF0IGl0XG4gICAgLy8gYXMgc3RpbGwgdW5pbml0aWFsaXplZCBhbmQgdHJ5IGFnYWluIG5leHQgdGltZS4gV2hpY2ggaXMgdGhlIHNhbWUgYXMgd2hhdFxuICAgIC8vIGhhcHBlbnMgaWYgdGhlIGN0b3Igb3IgYW55IHdyYXBwZXJzIHByb2Nlc3NpbmcgdGhlIGN0b3IgdGhyb3dzLiBUaGlzIG1pZ2h0XG4gICAgLy8gZW5kIHVwIGZpeGluZyBpdCBpZiB0aGUgcmVzb2x1dGlvbiB3YXMgYSBjb25jdXJyZW5jeSBidWcuXG5cbiAgICB0aGVuYWJsZS50aGVuKGZ1bmN0aW9uIChtb2R1bGVPYmplY3QpIHtcbiAgICAgIGlmIChwYXlsb2FkLl9zdGF0dXMgPT09IFBlbmRpbmcgfHwgcGF5bG9hZC5fc3RhdHVzID09PSBVbmluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIFRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RhdGUuXG4gICAgICAgIHZhciByZXNvbHZlZCA9IHBheWxvYWQ7XG4gICAgICAgIHJlc29sdmVkLl9zdGF0dXMgPSBSZXNvbHZlZDtcbiAgICAgICAgcmVzb2x2ZWQuX3Jlc3VsdCA9IG1vZHVsZU9iamVjdDtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmIChwYXlsb2FkLl9zdGF0dXMgPT09IFBlbmRpbmcgfHwgcGF5bG9hZC5fc3RhdHVzID09PSBVbmluaXRpYWxpemVkKSB7XG4gICAgICAgIC8vIFRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RhdGUuXG4gICAgICAgIHZhciByZWplY3RlZCA9IHBheWxvYWQ7XG4gICAgICAgIHJlamVjdGVkLl9zdGF0dXMgPSBSZWplY3RlZDtcbiAgICAgICAgcmVqZWN0ZWQuX3Jlc3VsdCA9IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHBheWxvYWQuX3N0YXR1cyA9PT0gVW5pbml0aWFsaXplZCkge1xuICAgICAgLy8gSW4gY2FzZSwgd2UncmUgc3RpbGwgdW5pbml0aWFsaXplZCwgdGhlbiB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgdGhlbmFibGVcbiAgICAgIC8vIHRvIHJlc29sdmUuIFNldCBpdCBhcyBwZW5kaW5nIGluIHRoZSBtZWFudGltZS5cbiAgICAgIHZhciBwZW5kaW5nID0gcGF5bG9hZDtcbiAgICAgIHBlbmRpbmcuX3N0YXR1cyA9IFBlbmRpbmc7XG4gICAgICBwZW5kaW5nLl9yZXN1bHQgPSB0aGVuYWJsZTtcbiAgICB9XG4gIH1cblxuICBpZiAocGF5bG9hZC5fc3RhdHVzID09PSBSZXNvbHZlZCkge1xuICAgIHZhciBtb2R1bGVPYmplY3QgPSBwYXlsb2FkLl9yZXN1bHQ7XG5cbiAgICB7XG4gICAgICBpZiAobW9kdWxlT2JqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXJyb3IoJ2xhenk6IEV4cGVjdGVkIHRoZSByZXN1bHQgb2YgYSBkeW5hbWljIGltcCcgKyAnb3J0KCkgY2FsbC4gJyArICdJbnN0ZWFkIHJlY2VpdmVkOiAlc1xcblxcbllvdXIgY29kZSBzaG91bGQgbG9vayBsaWtlOiBcXG4gICcgKyAvLyBCcmVhayB1cCBpbXBvcnRzIHRvIGF2b2lkIGFjY2lkZW50YWxseSBwYXJzaW5nIHRoZW0gYXMgZGVwZW5kZW5jaWVzLlxuICAgICAgICAnY29uc3QgTXlDb21wb25lbnQgPSBsYXp5KCgpID0+IGltcCcgKyBcIm9ydCgnLi9NeUNvbXBvbmVudCcpKVxcblxcblwiICsgJ0RpZCB5b3UgYWNjaWRlbnRhbGx5IHB1dCBjdXJseSBicmFjZXMgYXJvdW5kIHRoZSBpbXBvcnQ/JywgbW9kdWxlT2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoISgnZGVmYXVsdCcgaW4gbW9kdWxlT2JqZWN0KSkge1xuICAgICAgICBlcnJvcignbGF6eTogRXhwZWN0ZWQgdGhlIHJlc3VsdCBvZiBhIGR5bmFtaWMgaW1wJyArICdvcnQoKSBjYWxsLiAnICsgJ0luc3RlYWQgcmVjZWl2ZWQ6ICVzXFxuXFxuWW91ciBjb2RlIHNob3VsZCBsb29rIGxpa2U6IFxcbiAgJyArIC8vIEJyZWFrIHVwIGltcG9ydHMgdG8gYXZvaWQgYWNjaWRlbnRhbGx5IHBhcnNpbmcgdGhlbSBhcyBkZXBlbmRlbmNpZXMuXG4gICAgICAgICdjb25zdCBNeUNvbXBvbmVudCA9IGxhenkoKCkgPT4gaW1wJyArIFwib3J0KCcuL015Q29tcG9uZW50JykpXCIsIG1vZHVsZU9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZU9iamVjdC5kZWZhdWx0O1xuICB9IGVsc2Uge1xuICAgIHRocm93IHBheWxvYWQuX3Jlc3VsdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsYXp5KGN0b3IpIHtcbiAgdmFyIHBheWxvYWQgPSB7XG4gICAgLy8gV2UgdXNlIHRoZXNlIGZpZWxkcyB0byBzdG9yZSB0aGUgcmVzdWx0LlxuICAgIF9zdGF0dXM6IFVuaW5pdGlhbGl6ZWQsXG4gICAgX3Jlc3VsdDogY3RvclxuICB9O1xuICB2YXIgbGF6eVR5cGUgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0xBWllfVFlQRSxcbiAgICBfcGF5bG9hZDogcGF5bG9hZCxcbiAgICBfaW5pdDogbGF6eUluaXRpYWxpemVyXG4gIH07XG5cbiAge1xuICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoaXMgd291bGQganVzdCBzZXQgaXQgb24gdGhlIG9iamVjdC5cbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIHZhciBwcm9wVHlwZXM7IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobGF6eVR5cGUsIHtcbiAgICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvcHM7XG4gICAgICAgIH0sXG4gICAgICAgIC8vICRGbG93Rml4TWVbbWlzc2luZy1sb2NhbC1hbm5vdF1cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3RGVmYXVsdFByb3BzKSB7XG4gICAgICAgICAgZXJyb3IoJ0l0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gYXNzaWduIGBkZWZhdWx0UHJvcHNgIHRvICcgKyAnYSBsYXp5IGNvbXBvbmVudCBpbXBvcnQuIEVpdGhlciBzcGVjaWZ5IHRoZW0gd2hlcmUgdGhlIGNvbXBvbmVudCAnICsgJ2lzIGRlZmluZWQsIG9yIGNyZWF0ZSBhIHdyYXBwaW5nIGNvbXBvbmVudCBhcm91bmQgaXQuJyk7XG5cbiAgICAgICAgICBkZWZhdWx0UHJvcHMgPSBuZXdEZWZhdWx0UHJvcHM7IC8vIE1hdGNoIHByb2R1Y3Rpb24gYmVoYXZpb3IgbW9yZSBjbG9zZWx5OlxuICAgICAgICAgIC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BUeXBlcztcbiAgICAgICAgfSxcbiAgICAgICAgLy8gJEZsb3dGaXhNZVttaXNzaW5nLWxvY2FsLWFubm90XVxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQcm9wVHlwZXMpIHtcbiAgICAgICAgICBlcnJvcignSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYHByb3BUeXBlc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcblxuICAgICAgICAgIHByb3BUeXBlcyA9IG5ld1Byb3BUeXBlczsgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG4gICAgICAgICAgLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG5cbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobGF6eVR5cGUsICdwcm9wVHlwZXMnLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBsYXp5VHlwZTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZFJlZihyZW5kZXIpIHtcbiAge1xuICAgIGlmIChyZW5kZXIgIT0gbnVsbCAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkge1xuICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgYG1lbW9gICcgKyAnY29tcG9uZW50LiBJbnN0ZWFkIG9mIGZvcndhcmRSZWYobWVtbyguLi4pKSwgdXNlICcgKyAnbWVtbyhmb3J3YXJkUmVmKC4uLikpLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHdhcyBnaXZlbiAlcy4nLCByZW5kZXIgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcmVuZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlbmRlci5sZW5ndGggIT09IDAgJiYgcmVuZGVyLmxlbmd0aCAhPT0gMikge1xuICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGFjY2VwdCBleGFjdGx5IHR3byBwYXJhbWV0ZXJzOiBwcm9wcyBhbmQgcmVmLiAlcycsIHJlbmRlci5sZW5ndGggPT09IDEgPyAnRGlkIHlvdSBmb3JnZXQgdG8gdXNlIHRoZSByZWYgcGFyYW1ldGVyPycgOiAnQW55IGFkZGl0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgdW5kZWZpbmVkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW5kZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHJlbmRlci5kZWZhdWx0UHJvcHMgIT0gbnVsbCkge1xuICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IGRlZmF1bHRQcm9wcy4gJyArICdEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50PycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBlbGVtZW50VHlwZSA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSxcbiAgICByZW5kZXI6IHJlbmRlclxuICB9O1xuXG4gIHtcbiAgICB2YXIgb3duTmFtZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudFR5cGUsICdkaXNwbGF5TmFtZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgb3duTmFtZSA9IG5hbWU7IC8vIFRoZSBpbm5lciBjb21wb25lbnQgc2hvdWxkbid0IGluaGVyaXQgdGhpcyBkaXNwbGF5IG5hbWUgaW4gbW9zdCBjYXNlcyxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgY29tcG9uZW50IG1heSBiZSB1c2VkIGVsc2V3aGVyZS5cbiAgICAgICAgLy8gQnV0IGl0J3MgbmljZSBmb3IgYW5vbnltb3VzIGZ1bmN0aW9ucyB0byBpbmhlcml0IHRoZSBuYW1lLFxuICAgICAgICAvLyBzbyB0aGF0IG91ciBjb21wb25lbnQtc3RhY2sgZ2VuZXJhdGlvbiBsb2dpYyB3aWxsIGRpc3BsYXkgdGhlaXIgZnJhbWVzLlxuICAgICAgICAvLyBBbiBhbm9ueW1vdXMgZnVuY3Rpb24gZ2VuZXJhbGx5IHN1Z2dlc3RzIGEgcGF0dGVybiBsaWtlOlxuICAgICAgICAvLyAgIFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHsuLi59KTtcbiAgICAgICAgLy8gVGhpcyBraW5kIG9mIGlubmVyIGZ1bmN0aW9uIGlzIG5vdCB1c2VkIGVsc2V3aGVyZSBzbyB0aGUgc2lkZSBlZmZlY3QgaXMgb2theS5cblxuICAgICAgICBpZiAoIXJlbmRlci5uYW1lICYmICFyZW5kZXIuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICByZW5kZXIuZGlzcGxheU5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudFR5cGU7XG59XG5cbmZ1bmN0aW9uIG1lbW8odHlwZSwgY29tcGFyZSkge1xuICB7XG4gICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkpIHtcbiAgICAgIGVycm9yKCdtZW1vOiBUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIGNvbXBvbmVudC4gSW5zdGVhZCAnICsgJ3JlY2VpdmVkOiAlcycsIHR5cGUgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGVsZW1lbnRUeXBlID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9NRU1PX1RZUEUsXG4gICAgdHlwZTogdHlwZSxcbiAgICBjb21wYXJlOiBjb21wYXJlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29tcGFyZVxuICB9O1xuXG4gIHtcbiAgICB2YXIgb3duTmFtZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudFR5cGUsICdkaXNwbGF5TmFtZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgb3duTmFtZSA9IG5hbWU7IC8vIFRoZSBpbm5lciBjb21wb25lbnQgc2hvdWxkbid0IGluaGVyaXQgdGhpcyBkaXNwbGF5IG5hbWUgaW4gbW9zdCBjYXNlcyxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgY29tcG9uZW50IG1heSBiZSB1c2VkIGVsc2V3aGVyZS5cbiAgICAgICAgLy8gQnV0IGl0J3MgbmljZSBmb3IgYW5vbnltb3VzIGZ1bmN0aW9ucyB0byBpbmhlcml0IHRoZSBuYW1lLFxuICAgICAgICAvLyBzbyB0aGF0IG91ciBjb21wb25lbnQtc3RhY2sgZ2VuZXJhdGlvbiBsb2dpYyB3aWxsIGRpc3BsYXkgdGhlaXIgZnJhbWVzLlxuICAgICAgICAvLyBBbiBhbm9ueW1vdXMgZnVuY3Rpb24gZ2VuZXJhbGx5IHN1Z2dlc3RzIGEgcGF0dGVybiBsaWtlOlxuICAgICAgICAvLyAgIFJlYWN0Lm1lbW8oKHByb3BzKSA9PiB7Li4ufSk7XG4gICAgICAgIC8vIFRoaXMga2luZCBvZiBpbm5lciBmdW5jdGlvbiBpcyBub3QgdXNlZCBlbHNld2hlcmUgc28gdGhlIHNpZGUgZWZmZWN0IGlzIG9rYXkuXG5cbiAgICAgICAgaWYgKCF0eXBlLm5hbWUgJiYgIXR5cGUuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICB0eXBlLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRUeXBlO1xufVxuXG52YXIgVU5URVJNSU5BVEVEID0gMDtcbnZhciBURVJNSU5BVEVEID0gMTtcbnZhciBFUlJPUkVEID0gMjtcblxuZnVuY3Rpb24gY3JlYXRlQ2FjaGVSb290KCkge1xuICByZXR1cm4gbmV3IFdlYWtNYXAoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FjaGVOb2RlKCkge1xuICByZXR1cm4ge1xuICAgIHM6IFVOVEVSTUlOQVRFRCxcbiAgICAvLyBzdGF0dXMsIHJlcHJlc2VudHMgd2hldGhlciB0aGUgY2FjaGVkIGNvbXB1dGF0aW9uIHJldHVybmVkIGEgdmFsdWUgb3IgdGhyZXcgYW4gZXJyb3JcbiAgICB2OiB1bmRlZmluZWQsXG4gICAgLy8gdmFsdWUsIGVpdGhlciB0aGUgY2FjaGVkIHJlc3VsdCBvciBhbiBlcnJvciwgZGVwZW5kaW5nIG9uIHNcbiAgICBvOiBudWxsLFxuICAgIC8vIG9iamVjdCBjYWNoZSwgYSBXZWFrTWFwIHdoZXJlIG5vbi1wcmltaXRpdmUgYXJndW1lbnRzIGFyZSBzdG9yZWRcbiAgICBwOiBudWxsIC8vIHByaW1pdGl2ZSBjYWNoZSwgYSByZWd1bGFyIE1hcCB3aGVyZSBwcmltaXRpdmUgYXJndW1lbnRzIGFyZSBzdG9yZWQuXG5cbiAgfTtcbn1cblxuZnVuY3Rpb24gY2FjaGUkMShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gUmVhY3RDdXJyZW50Q2FjaGUuY3VycmVudDtcblxuICAgIGlmICghZGlzcGF0Y2hlcikge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGlzcGF0Y2hlciwgdGhlbiB3ZSB0cmVhdCB0aGlzIGFzIG5vdCBiZWluZyBjYWNoZWQuXG4gICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogV2UgZG9uJ3Qgd2FudCB0byB1c2UgcmVzdCBhcmd1bWVudHMgc2luY2Ugd2UgdHJhbnNwaWxlIHRoZSBjb2RlLlxuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgdmFyIGZuTWFwID0gZGlzcGF0Y2hlci5nZXRDYWNoZUZvclR5cGUoY3JlYXRlQ2FjaGVSb290KTtcbiAgICB2YXIgZm5Ob2RlID0gZm5NYXAuZ2V0KGZuKTtcbiAgICB2YXIgY2FjaGVOb2RlO1xuXG4gICAgaWYgKGZuTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYWNoZU5vZGUgPSBjcmVhdGVDYWNoZU5vZGUoKTtcbiAgICAgIGZuTWFwLnNldChmbiwgY2FjaGVOb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVOb2RlID0gZm5Ob2RlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsKSB7XG4gICAgICAgIC8vIE9iamVjdHMgZ28gaW50byBhIFdlYWtNYXBcbiAgICAgICAgdmFyIG9iamVjdENhY2hlID0gY2FjaGVOb2RlLm87XG5cbiAgICAgICAgaWYgKG9iamVjdENhY2hlID09PSBudWxsKSB7XG4gICAgICAgICAgY2FjaGVOb2RlLm8gPSBvYmplY3RDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2JqZWN0Tm9kZSA9IG9iamVjdENhY2hlLmdldChhcmcpO1xuXG4gICAgICAgIGlmIChvYmplY3ROb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWNoZU5vZGUgPSBjcmVhdGVDYWNoZU5vZGUoKTtcbiAgICAgICAgICBvYmplY3RDYWNoZS5zZXQoYXJnLCBjYWNoZU5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhY2hlTm9kZSA9IG9iamVjdE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgZ28gaW50byBhIHJlZ3VsYXIgTWFwXG4gICAgICAgIHZhciBwcmltaXRpdmVDYWNoZSA9IGNhY2hlTm9kZS5wO1xuXG4gICAgICAgIGlmIChwcmltaXRpdmVDYWNoZSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNhY2hlTm9kZS5wID0gcHJpbWl0aXZlQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJpbWl0aXZlTm9kZSA9IHByaW1pdGl2ZUNhY2hlLmdldChhcmcpO1xuXG4gICAgICAgIGlmIChwcmltaXRpdmVOb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWNoZU5vZGUgPSBjcmVhdGVDYWNoZU5vZGUoKTtcbiAgICAgICAgICBwcmltaXRpdmVDYWNoZS5zZXQoYXJnLCBjYWNoZU5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhY2hlTm9kZSA9IHByaW1pdGl2ZU5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2FjaGVOb2RlLnMgPT09IFRFUk1JTkFURUQpIHtcbiAgICAgIHJldHVybiBjYWNoZU5vZGUudjtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGVOb2RlLnMgPT09IEVSUk9SRUQpIHtcbiAgICAgIHRocm93IGNhY2hlTm9kZS52O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogV2UgZG9uJ3Qgd2FudCB0byB1c2UgcmVzdCBhcmd1bWVudHMgc2luY2Ugd2UgdHJhbnNwaWxlIHRoZSBjb2RlLlxuICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgdGVybWluYXRlZE5vZGUgPSBjYWNoZU5vZGU7XG4gICAgICB0ZXJtaW5hdGVkTm9kZS5zID0gVEVSTUlOQVRFRDtcbiAgICAgIHRlcm1pbmF0ZWROb2RlLnYgPSByZXN1bHQ7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBXZSBzdG9yZSB0aGUgZmlyc3QgZXJyb3IgdGhhdCdzIHRocm93biBhbmQgcmV0aHJvdyBpdC5cbiAgICAgIHZhciBlcnJvcmVkTm9kZSA9IGNhY2hlTm9kZTtcbiAgICAgIGVycm9yZWROb2RlLnMgPSBFUlJPUkVEO1xuICAgICAgZXJyb3JlZE5vZGUudiA9IGVycm9yO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuXG52YXIgY2FjaGUgPSBjYWNoZSQxO1xuXG5mdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2hlcigpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyJDEuY3VycmVudDtcblxuICB7XG4gICAgaWYgKGRpc3BhdGNoZXIgPT09IG51bGwpIHtcbiAgICAgIGVycm9yKCdJbnZhbGlkIGhvb2sgY2FsbC4gSG9va3MgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBvZiB0aGUgYm9keSBvZiBhIGZ1bmN0aW9uIGNvbXBvbmVudC4gVGhpcyBjb3VsZCBoYXBwZW4gZm9yJyArICcgb25lIG9mIHRoZSBmb2xsb3dpbmcgcmVhc29uczpcXG4nICsgJzEuIFlvdSBtaWdodCBoYXZlIG1pc21hdGNoaW5nIHZlcnNpb25zIG9mIFJlYWN0IGFuZCB0aGUgcmVuZGVyZXIgKHN1Y2ggYXMgUmVhY3QgRE9NKVxcbicgKyAnMi4gWW91IG1pZ2h0IGJlIGJyZWFraW5nIHRoZSBSdWxlcyBvZiBIb29rc1xcbicgKyAnMy4gWW91IG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0IGluIHRoZSBzYW1lIGFwcFxcbicgKyAnU2VlIGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvaW52YWxpZC1ob29rLWNhbGwgZm9yIHRpcHMgYWJvdXQgaG93IHRvIGRlYnVnIGFuZCBmaXggdGhpcyBwcm9ibGVtLicpO1xuICAgIH1cbiAgfSAvLyBXaWxsIHJlc3VsdCBpbiBhIG51bGwgYWNjZXNzIGVycm9yIGlmIGFjY2Vzc2VkIG91dHNpZGUgcmVuZGVyIHBoYXNlLiBXZVxuICAvLyBpbnRlbnRpb25hbGx5IGRvbid0IHRocm93IG91ciBvd24gZXJyb3IgYmVjYXVzZSB0aGlzIGlzIGluIGEgaG90IHBhdGguXG4gIC8vIEFsc28gaGVscHMgZW5zdXJlIHRoaXMgaXMgaW5saW5lZC5cblxuXG4gIHJldHVybiBkaXNwYXRjaGVyO1xufVxuZnVuY3Rpb24gdXNlQ29udGV4dChDb250ZXh0KSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcblxuICB7XG4gICAgaWYgKENvbnRleHQuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlNVTUVSX1RZUEUpIHtcbiAgICAgIGVycm9yKCdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Db25zdW1lcikgaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBjYXVzZSBidWdzLiAnICsgJ0RpZCB5b3UgbWVhbiB0byBjYWxsIHVzZUNvbnRleHQoQ29udGV4dCkgaW5zdGVhZD8nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGlzcGF0Y2hlci51c2VDb250ZXh0KENvbnRleHQpO1xufVxuZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlU3RhdGUoaW5pdGlhbFN0YXRlKTtcbn1cbmZ1bmN0aW9uIHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCk7XG59XG5mdW5jdGlvbiB1c2VSZWYoaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVmKGluaXRpYWxWYWx1ZSk7XG59XG5mdW5jdGlvbiB1c2VFZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlRWZmZWN0KGNyZWF0ZSwgZGVwcyk7XG59XG5mdW5jdGlvbiB1c2VJbnNlcnRpb25FZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlSW5zZXJ0aW9uRWZmZWN0KGNyZWF0ZSwgZGVwcyk7XG59XG5mdW5jdGlvbiB1c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlTGF5b3V0RWZmZWN0KGNyZWF0ZSwgZGVwcyk7XG59XG5mdW5jdGlvbiB1c2VDYWxsYmFjayhjYWxsYmFjaywgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXBzKTtcbn1cbmZ1bmN0aW9uIHVzZU1lbW8oY3JlYXRlLCBkZXBzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlTWVtbyhjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyRm4pIHtcbiAge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXJGbik7XG4gIH1cbn1cbmZ1bmN0aW9uIHVzZVRyYW5zaXRpb24oKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlVHJhbnNpdGlvbigpO1xufVxuZnVuY3Rpb24gdXNlRGVmZXJyZWRWYWx1ZSh2YWx1ZSwgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlRGVmZXJyZWRWYWx1ZSh2YWx1ZSwgaW5pdGlhbFZhbHVlKTtcbn1cbmZ1bmN0aW9uIHVzZUlkKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUlkKCk7XG59XG5mdW5jdGlvbiB1c2VTeW5jRXh0ZXJuYWxTdG9yZShzdWJzY3JpYmUsIGdldFNuYXBzaG90LCBnZXRTZXJ2ZXJTbmFwc2hvdCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVN5bmNFeHRlcm5hbFN0b3JlKHN1YnNjcmliZSwgZ2V0U25hcHNob3QsIGdldFNlcnZlclNuYXBzaG90KTtcbn1cbmZ1bmN0aW9uIHVzZUNhY2hlUmVmcmVzaCgpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpOyAvLyAkRmxvd0ZpeE1lW25vdC1hLWZ1bmN0aW9uXSBUaGlzIGlzIHVuc3RhYmxlLCB0aHVzIG9wdGlvbmFsXG5cbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ2FjaGVSZWZyZXNoKCk7XG59XG5mdW5jdGlvbiB1c2UodXNhYmxlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlKHVzYWJsZSk7XG59XG5mdW5jdGlvbiB1c2VPcHRpbWlzdGljKHBhc3N0aHJvdWdoLCByZWR1Y2VyKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTsgLy8gJEZsb3dGaXhNZVtub3QtYS1mdW5jdGlvbl0gVGhpcyBpcyB1bnN0YWJsZSwgdGh1cyBvcHRpb25hbFxuXG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZU9wdGltaXN0aWMocGFzc3Rocm91Z2gsIHJlZHVjZXIpO1xufVxuXG5mdW5jdGlvbiBzdGFydFRyYW5zaXRpb24oc2NvcGUsIG9wdGlvbnMpIHtcbiAgdmFyIHByZXZUcmFuc2l0aW9uID0gUmVhY3RDdXJyZW50QmF0Y2hDb25maWcudHJhbnNpdGlvbjsgLy8gRWFjaCByZW5kZXJlciByZWdpc3RlcnMgYSBjYWxsYmFjayB0byByZWNlaXZlIHRoZSByZXR1cm4gdmFsdWUgb2ZcbiAgLy8gdGhlIHNjb3BlIGZ1bmN0aW9uLiBUaGlzIGlzIHVzZWQgdG8gaW1wbGVtZW50IGFzeW5jIGFjdGlvbnMuXG5cbiAgdmFyIGNhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbiAgdmFyIHRyYW5zaXRpb24gPSB7XG4gICAgX2NhbGxiYWNrczogY2FsbGJhY2tzXG4gIH07XG4gIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICB2YXIgY3VycmVudFRyYW5zaXRpb24gPSBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZy50cmFuc2l0aW9uO1xuXG4gIHtcbiAgICBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZy50cmFuc2l0aW9uLl91cGRhdGVkRmliZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0dXJuVmFsdWUgPSBzY29wZSgpO1xuXG4gICAgICBpZiAodHlwZW9mIHJldHVyblZhbHVlID09PSAnb2JqZWN0JyAmJiByZXR1cm5WYWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgcmV0dXJuVmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY3VycmVudFRyYW5zaXRpb24sIHJldHVyblZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVyblZhbHVlLnRoZW4obm9vcCwgb25FcnJvcik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB3YXJuQWJvdXRUcmFuc2l0aW9uU3Vic2NyaXB0aW9ucyhwcmV2VHJhbnNpdGlvbiwgY3VycmVudFRyYW5zaXRpb24pO1xuICAgICAgUmVhY3RDdXJyZW50QmF0Y2hDb25maWcudHJhbnNpdGlvbiA9IHByZXZUcmFuc2l0aW9uO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB3YXJuQWJvdXRUcmFuc2l0aW9uU3Vic2NyaXB0aW9ucyhwcmV2VHJhbnNpdGlvbiwgY3VycmVudFRyYW5zaXRpb24pIHtcbiAge1xuICAgIGlmIChwcmV2VHJhbnNpdGlvbiA9PT0gbnVsbCAmJiBjdXJyZW50VHJhbnNpdGlvbi5fdXBkYXRlZEZpYmVycykge1xuICAgICAgdmFyIHVwZGF0ZWRGaWJlcnNDb3VudCA9IGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzLnNpemU7XG5cbiAgICAgIGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzLmNsZWFyKCk7XG5cbiAgICAgIGlmICh1cGRhdGVkRmliZXJzQ291bnQgPiAxMCkge1xuICAgICAgICB3YXJuKCdEZXRlY3RlZCBhIGxhcmdlIG51bWJlciBvZiB1cGRhdGVzIGluc2lkZSBzdGFydFRyYW5zaXRpb24uICcgKyAnSWYgdGhpcyBpcyBkdWUgdG8gYSBzdWJzY3JpcHRpb24gcGxlYXNlIHJlLXdyaXRlIGl0IHRvIHVzZSBSZWFjdCBwcm92aWRlZCBob29rcy4gJyArICdPdGhlcndpc2UgY29uY3VycmVudCBtb2RlIGd1YXJhbnRlZXMgYXJlIG9mZiB0aGUgdGFibGUuJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fSAvLyBVc2UgcmVwb3J0RXJyb3IsIGlmIGl0IGV4aXN0cy4gT3RoZXJ3aXNlIGNvbnNvbGUuZXJyb3IuIFRoaXMgaXMgdGhlIHNhbWUgYXNcbi8vIHRoZSBkZWZhdWx0IGZvciBvblJlY292ZXJhYmxlRXJyb3IuXG5cblxudmFyIG9uRXJyb3IgPSB0eXBlb2YgcmVwb3J0RXJyb3IgPT09ICdmdW5jdGlvbicgPyAvLyBJbiBtb2Rlcm4gYnJvd3NlcnMsIHJlcG9ydEVycm9yIHdpbGwgZGlzcGF0Y2ggYW4gZXJyb3IgZXZlbnQsXG4vLyBlbXVsYXRpbmcgYW4gdW5jYXVnaHQgSmF2YVNjcmlwdCBlcnJvci5cbnJlcG9ydEVycm9yIDogZnVuY3Rpb24gKGVycm9yKSB7XG4gIC8vIEluIG9sZGVyIGJyb3dzZXJzIGFuZCB0ZXN0IGVudmlyb25tZW50cywgZmFsbGJhY2sgdG8gY29uc29sZS5lcnJvci5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuICBjb25zb2xlWydlcnJvciddKGVycm9yKTtcbn07XG5cbnZhciBkaWRXYXJuQWJvdXRNZXNzYWdlQ2hhbm5lbCA9IGZhbHNlO1xudmFyIGVucXVldWVUYXNrSW1wbCA9IG51bGw7XG5mdW5jdGlvbiBlbnF1ZXVlVGFzayh0YXNrKSB7XG4gIGlmIChlbnF1ZXVlVGFza0ltcGwgPT09IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgLy8gcmVhZCByZXF1aXJlIG9mZiB0aGUgbW9kdWxlIG9iamVjdCB0byBnZXQgYXJvdW5kIHRoZSBidW5kbGVycy5cbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhlbSB0byBkZXRlY3QgYSByZXF1aXJlIGFuZCBidW5kbGUgYSBOb2RlIHBvbHlmaWxsLlxuICAgICAgdmFyIHJlcXVpcmVTdHJpbmcgPSAoJ3JlcXVpcmUnICsgTWF0aC5yYW5kb20oKSkuc2xpY2UoMCwgNyk7XG4gICAgICB2YXIgbm9kZVJlcXVpcmUgPSBtb2R1bGUgJiYgbW9kdWxlW3JlcXVpcmVTdHJpbmddOyAvLyBhc3N1bWluZyB3ZSdyZSBpbiBub2RlLCBsZXQncyB0cnkgdG8gZ2V0IG5vZGUnc1xuICAgICAgLy8gdmVyc2lvbiBvZiBzZXRJbW1lZGlhdGUsIGJ5cGFzc2luZyBmYWtlIHRpbWVycyBpZiBhbnkuXG5cbiAgICAgIGVucXVldWVUYXNrSW1wbCA9IG5vZGVSZXF1aXJlLmNhbGwobW9kdWxlLCAndGltZXJzJykuc2V0SW1tZWRpYXRlO1xuICAgIH0gY2F0Y2ggKF9lcnIpIHtcbiAgICAgIC8vIHdlJ3JlIGluIGEgYnJvd3NlclxuICAgICAgLy8gd2UgY2FuJ3QgdXNlIHJlZ3VsYXIgdGltZXJzIGJlY2F1c2UgdGhleSBtYXkgc3RpbGwgYmUgZmFrZWRcbiAgICAgIC8vIHNvIHdlIHRyeSBNZXNzYWdlQ2hhbm5lbCtwb3N0TWVzc2FnZSBpbnN0ZWFkXG4gICAgICBlbnF1ZXVlVGFza0ltcGwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAge1xuICAgICAgICAgIGlmIChkaWRXYXJuQWJvdXRNZXNzYWdlQ2hhbm5lbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRpZFdhcm5BYm91dE1lc3NhZ2VDaGFubmVsID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZXJyb3IoJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGEgTWVzc2FnZUNoYW5uZWwgaW1wbGVtZW50YXRpb24sICcgKyAnc28gZW5xdWV1aW5nIHRhc2tzIHZpYSBhd2FpdCBhY3QoYXN5bmMgKCkgPT4gLi4uKSB3aWxsIGZhaWwuICcgKyAnUGxlYXNlIGZpbGUgYW4gaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3VlcyAnICsgJ2lmIHlvdSBlbmNvdW50ZXIgdGhpcyB3YXJuaW5nLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gY2FsbGJhY2s7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UodW5kZWZpbmVkKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVucXVldWVUYXNrSW1wbCh0YXNrKTtcbn1cblxuLy8gbnVtYmVyIG9mIGBhY3RgIHNjb3BlcyBvbiB0aGUgc3RhY2suXG5cbnZhciBhY3RTY29wZURlcHRoID0gMDsgLy8gV2Ugb25seSB3YXJuIHRoZSBmaXJzdCB0aW1lIHlvdSBuZWdsZWN0IHRvIGF3YWl0IGFuIGFzeW5jIGBhY3RgIHNjb3BlLlxuXG52YXIgZGlkV2Fybk5vQXdhaXRBY3QgPSBmYWxzZTtcbmZ1bmN0aW9uIGFjdChjYWxsYmFjaykge1xuICB7XG4gICAgLy8gV2hlbiBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5jdXJyZW50IGlzIG5vdCBudWxsLCBpdCBzaWduYWxzIHRvIFJlYWN0IHRoYXRcbiAgICAvLyB3ZSdyZSBjdXJyZW50bHkgaW5zaWRlIGFuIGBhY3RgIHNjb3BlLiBSZWFjdCB3aWxsIHB1c2ggYWxsIGl0cyB0YXNrcyB0b1xuICAgIC8vIHRoaXMgcXVldWUgaW5zdGVhZCBvZiBzY2hlZHVsaW5nIHRoZW0gd2l0aCBwbGF0Zm9ybSBBUElzLlxuICAgIC8vXG4gICAgLy8gV2Ugc2V0IHRoaXMgdG8gYW4gZW1wdHkgYXJyYXkgd2hlbiB3ZSBmaXJzdCBlbnRlciBhbiBgYWN0YCBzY29wZSwgYW5kXG4gICAgLy8gb25seSB1bnNldCBpdCBvbmNlIHdlJ3ZlIGxlZnQgdGhlIG91dGVybW9zdCBgYWN0YCBzY29wZSDigJQgcmVtZW1iZXIgdGhhdFxuICAgIC8vIGBhY3RgIGNhbGxzIGNhbiBiZSBuZXN0ZWQuXG4gICAgLy9cbiAgICAvLyBJZiB3ZSdyZSBhbHJlYWR5IGluc2lkZSBhbiBgYWN0YCBzY29wZSwgcmV1c2UgdGhlIGV4aXN0aW5nIHF1ZXVlLlxuICAgIHZhciBwcmV2SXNCYXRjaGluZ0xlZ2FjeSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlLmlzQmF0Y2hpbmdMZWdhY3k7XG4gICAgdmFyIHByZXZBY3RRdWV1ZSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlLmN1cnJlbnQ7XG4gICAgdmFyIHByZXZBY3RTY29wZURlcHRoID0gYWN0U2NvcGVEZXB0aDtcbiAgICBhY3RTY29wZURlcHRoKys7XG4gICAgdmFyIHF1ZXVlID0gUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9IHByZXZBY3RRdWV1ZSAhPT0gbnVsbCA/IHByZXZBY3RRdWV1ZSA6IFtdOyAvLyBVc2VkIHRvIHJlcHJvZHVjZSBiZWhhdmlvciBvZiBgYmF0Y2hlZFVwZGF0ZXNgIGluIGxlZ2FjeSBtb2RlLiBPbmx5XG4gICAgLy8gc2V0IHRvIGB0cnVlYCB3aGlsZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgaXMgZXhlY3V0ZWQsIG5vdCBmb3IgdXBkYXRlc1xuICAgIC8vIHRyaWdnZXJlZCBkdXJpbmcgYW4gYXN5bmMgZXZlbnQsIGJlY2F1c2UgdGhpcyBpcyBob3cgdGhlIGxlZ2FjeVxuICAgIC8vIGltcGxlbWVudGF0aW9uIG9mIGBhY3RgIGJlaGF2ZWQuXG5cbiAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5pc0JhdGNoaW5nTGVnYWN5ID0gdHJ1ZTtcbiAgICB2YXIgcmVzdWx0OyAvLyBUaGlzIHRyYWNrcyB3aGV0aGVyIHRoZSBgYWN0YCBjYWxsIGlzIGF3YWl0ZWQuIEluIGNlcnRhaW4gY2FzZXMsIG5vdFxuICAgIC8vIGF3YWl0aW5nIGl0IGlzIGEgbWlzdGFrZSwgc28gd2Ugd2lsbCBkZXRlY3QgdGhhdCBhbmQgd2Fybi5cblxuICAgIHZhciBkaWRBd2FpdEFjdENhbGwgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBSZXNldCB0aGlzIHRvIGBmYWxzZWAgcmlnaHQgYmVmb3JlIGVudGVyaW5nIHRoZSBSZWFjdCB3b3JrIGxvb3AuIFRoZVxuICAgICAgLy8gb25seSBwbGFjZSB3ZSBldmVyIHJlYWQgdGhpcyBmaWVsZHMgaXMganVzdCBiZWxvdywgcmlnaHQgYWZ0ZXIgcnVubmluZ1xuICAgICAgLy8gdGhlIGNhbGxiYWNrLiBTbyB3ZSBkb24ndCBuZWVkIHRvIHJlc2V0IGFmdGVyIHRoZSBjYWxsYmFjayBydW5zLlxuICAgICAgUmVhY3RDdXJyZW50QWN0UXVldWUuZGlkU2NoZWR1bGVMZWdhY3lVcGRhdGUgPSBmYWxzZTtcbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgICB2YXIgZGlkU2NoZWR1bGVMZWdhY3lVcGRhdGUgPSBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5kaWRTY2hlZHVsZUxlZ2FjeVVwZGF0ZTsgLy8gUmVwbGljYXRlIGJlaGF2aW9yIG9mIG9yaWdpbmFsIGBhY3RgIGltcGxlbWVudGF0aW9uIGluIGxlZ2FjeSBtb2RlLFxuICAgICAgLy8gd2hpY2ggZmx1c2hlZCB1cGRhdGVzIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzY29wZSBmdW5jdGlvbiBleGl0cywgZXZlblxuICAgICAgLy8gaWYgaXQncyBhbiBhc3luYyBmdW5jdGlvbi5cblxuICAgICAgaWYgKCFwcmV2SXNCYXRjaGluZ0xlZ2FjeSAmJiBkaWRTY2hlZHVsZUxlZ2FjeVVwZGF0ZSkge1xuICAgICAgICBmbHVzaEFjdFF1ZXVlKHF1ZXVlKTtcbiAgICAgIH0gLy8gYGlzQmF0Y2hpbmdMZWdhY3lgIGdldHMgcmVzZXQgdXNpbmcgdGhlIHJlZ3VsYXIgc3RhY2ssIG5vdCB0aGUgYXN5bmNcbiAgICAgIC8vIG9uZSB1c2VkIHRvIHRyYWNrIGBhY3RgIHNjb3Blcy4gV2h5LCB5b3UgbWF5IGJlIHdvbmRlcmluZz8gQmVjYXVzZVxuICAgICAgLy8gdGhhdCdzIGhvdyBpdCB3b3JrZWQgYmVmb3JlIHZlcnNpb24gMTguIFllcywgaXQncyBjb25mdXNpbmchIFdlIHNob3VsZFxuICAgICAgLy8gZGVsZXRlIGxlZ2FjeSBtb2RlISFcblxuXG4gICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5pc0JhdGNoaW5nTGVnYWN5ID0gcHJldklzQmF0Y2hpbmdMZWdhY3k7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGBpc0JhdGNoaW5nTGVnYWN5YCBnZXRzIHJlc2V0IHVzaW5nIHRoZSByZWd1bGFyIHN0YWNrLCBub3QgdGhlIGFzeW5jXG4gICAgICAvLyBvbmUgdXNlZCB0byB0cmFjayBgYWN0YCBzY29wZXMuIFdoeSwgeW91IG1heSBiZSB3b25kZXJpbmc/IEJlY2F1c2VcbiAgICAgIC8vIHRoYXQncyBob3cgaXQgd29ya2VkIGJlZm9yZSB2ZXJzaW9uIDE4LiBZZXMsIGl0J3MgY29uZnVzaW5nISBXZSBzaG91bGRcbiAgICAgIC8vIGRlbGV0ZSBsZWdhY3kgbW9kZSEhXG4gICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5pc0JhdGNoaW5nTGVnYWN5ID0gcHJldklzQmF0Y2hpbmdMZWdhY3k7XG4gICAgICBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQgIT09IG51bGwgJiYgdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgLy8gJEZsb3dGaXhNZVttZXRob2QtdW5iaW5kaW5nXVxuICAgIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQSBwcm9taXNlL3RoZW5hYmxlIHdhcyByZXR1cm5lZCBmcm9tIHRoZSBjYWxsYmFjay4gV2FpdCBmb3IgaXQgdG9cbiAgICAgIC8vIHJlc29sdmUgYmVmb3JlIGZsdXNoaW5nIHRoZSBxdWV1ZS5cbiAgICAgIC8vXG4gICAgICAvLyBJZiBgYWN0YCB3ZXJlIGltcGxlbWVudGVkIGFzIGFuIGFzeW5jIGZ1bmN0aW9uLCB0aGlzIHdob2xlIGJsb2NrIGNvdWxkXG4gICAgICAvLyBiZSBhIHNpbmdsZSBgYXdhaXRgIGNhbGwuIFRoYXQncyByZWFsbHkgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuXG4gICAgICAvLyB0aGlzIGJyYW5jaCBhbmQgdGhlIG5leHQgb25lLlxuICAgICAgdmFyIHRoZW5hYmxlID0gcmVzdWx0OyAvLyBXYXJuIGlmIHRoZSBhbiBgYWN0YCBjYWxsIHdpdGggYW4gYXN5bmMgc2NvcGUgaXMgbm90IGF3YWl0ZWQuIEluIGFcbiAgICAgIC8vIGZ1dHVyZSByZWxlYXNlLCBjb25zaWRlciBtYWtpbmcgdGhpcyBhbiBlcnJvci5cblxuICAgICAgcXVldWVTZXZlcmFsTWljcm90YXNrcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGlkQXdhaXRBY3RDYWxsICYmICFkaWRXYXJuTm9Bd2FpdEFjdCkge1xuICAgICAgICAgIGRpZFdhcm5Ob0F3YWl0QWN0ID0gdHJ1ZTtcblxuICAgICAgICAgIGVycm9yKCdZb3UgY2FsbGVkIGFjdChhc3luYyAoKSA9PiAuLi4pIHdpdGhvdXQgYXdhaXQuICcgKyAnVGhpcyBjb3VsZCBsZWFkIHRvIHVuZXhwZWN0ZWQgdGVzdGluZyBiZWhhdmlvdXIsICcgKyAnaW50ZXJsZWF2aW5nIG11bHRpcGxlIGFjdCBjYWxscyBhbmQgbWl4aW5nIHRoZWlyICcgKyAnc2NvcGVzLiAnICsgJ1lvdSBzaG91bGQgLSBhd2FpdCBhY3QoYXN5bmMgKCkgPT4gLi4uKTsnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgZGlkQXdhaXRBY3RDYWxsID0gdHJ1ZTtcbiAgICAgICAgICB0aGVuYWJsZS50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgcG9wQWN0U2NvcGUocHJldkFjdFF1ZXVlLCBwcmV2QWN0U2NvcGVEZXB0aCk7XG5cbiAgICAgICAgICAgIGlmIChwcmV2QWN0U2NvcGVEZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAvLyBXZSdyZSBleGl0aW5nIHRoZSBvdXRlcm1vc3QgYGFjdGAgc2NvcGUuIEZsdXNoIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmbHVzaEFjdFF1ZXVlKHF1ZXVlKTtcbiAgICAgICAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKC8vIFJlY3Vyc2l2ZWx5IGZsdXNoIHRhc2tzIHNjaGVkdWxlZCBieSBhIG1pY3JvdGFzay5cbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBgdGhlbmFibGVgIG1pZ2h0IG5vdCBiZSBhIHJlYWwgcHJvbWlzZSwgYW5kIGBmbHVzaEFjdFF1ZXVlYFxuICAgICAgICAgICAgICAgIC8vIG1pZ2h0IHRocm93LCBzbyB3ZSBuZWVkIHRvIHdyYXAgYGZsdXNoQWN0UXVldWVgIGluIGFcbiAgICAgICAgICAgICAgICAvLyB0cnkvY2F0Y2guXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IHJlc3VsdDsgLy8gVGhlIGNhbGxiYWNrIGlzIG5vdCBhbiBhc3luYyBmdW5jdGlvbi4gRXhpdCB0aGUgY3VycmVudFxuICAgICAgLy8gc2NvcGUgaW1tZWRpYXRlbHkuXG5cbiAgICAgIHBvcEFjdFNjb3BlKHByZXZBY3RRdWV1ZSwgcHJldkFjdFNjb3BlRGVwdGgpO1xuXG4gICAgICBpZiAocHJldkFjdFNjb3BlRGVwdGggPT09IDApIHtcbiAgICAgICAgLy8gV2UncmUgZXhpdGluZyB0aGUgb3V0ZXJtb3N0IGBhY3RgIHNjb3BlLiBGbHVzaCB0aGUgcXVldWUuXG4gICAgICAgIGZsdXNoQWN0UXVldWUocXVldWUpOyAvLyBJZiB0aGUgcXVldWUgaXMgbm90IGVtcHR5LCBpdCBpbXBsaWVzIHRoYXQgd2UgaW50ZW50aW9uYWxseSB5aWVsZGVkXG4gICAgICAgIC8vIHRvIHRoZSBtYWluIHRocmVhZCwgYmVjYXVzZSBzb21ldGhpbmcgc3VzcGVuZGVkLiBXZSB3aWxsIGNvbnRpbnVlXG4gICAgICAgIC8vIGluIGFuIGFzeW5jaHJvbm91cyB0YXNrLlxuICAgICAgICAvL1xuICAgICAgICAvLyBXYXJuIGlmIHNvbWV0aGluZyBzdXNwZW5kcyBidXQgdGhlIGBhY3RgIGNhbGwgaXMgbm90IGF3YWl0ZWQuXG4gICAgICAgIC8vIEluIGEgZnV0dXJlIHJlbGVhc2UsIGNvbnNpZGVyIG1ha2luZyB0aGlzIGFuIGVycm9yLlxuXG4gICAgICAgIGlmIChxdWV1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBxdWV1ZVNldmVyYWxNaWNyb3Rhc2tzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghZGlkQXdhaXRBY3RDYWxsICYmICFkaWRXYXJuTm9Bd2FpdEFjdCkge1xuICAgICAgICAgICAgICBkaWRXYXJuTm9Bd2FpdEFjdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgZXJyb3IoJ0EgY29tcG9uZW50IHN1c3BlbmRlZCBpbnNpZGUgYW4gYGFjdGAgc2NvcGUsIGJ1dCB0aGUgJyArICdgYWN0YCBjYWxsIHdhcyBub3QgYXdhaXRlZC4gV2hlbiB0ZXN0aW5nIFJlYWN0ICcgKyAnY29tcG9uZW50cyB0aGF0IGRlcGVuZCBvbiBhc3luY2hyb25vdXMgZGF0YSwgeW91IG11c3QgJyArICdhd2FpdCB0aGUgcmVzdWx0OlxcblxcbicgKyAnYXdhaXQgYWN0KCgpID0+IC4uLiknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSAvLyBMaWtlIG1hbnkgdGhpbmdzIGluIHRoaXMgbW9kdWxlLCB0aGlzIGlzIG5leHQgcGFydCBpcyBjb25mdXNpbmcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFdlIGRvIG5vdCBjdXJyZW50bHkgcmVxdWlyZSBldmVyeSBgYWN0YCBjYWxsIHRoYXQgaXMgcGFzc2VkIGFcbiAgICAgICAgLy8gY2FsbGJhY2sgdG8gYmUgYXdhaXRlZCwgdGhyb3VnaCBhcmd1YWJseSB3ZSBzaG91bGQuIFNpbmNlIHRoaXNcbiAgICAgICAgLy8gY2FsbGJhY2sgd2FzIHN5bmNocm9ub3VzLCB3ZSBuZWVkIHRvIGV4aXQgdGhlIGN1cnJlbnQgc2NvcGUgYmVmb3JlXG4gICAgICAgIC8vIHJldHVybmluZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSG93ZXZlciwgaWYgdGhlbmFibGUgd2UncmUgYWJvdXQgdG8gcmV0dXJuICppcyogYXdhaXRlZCwgd2UnbGxcbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgcmVzdG9yZSB0aGUgY3VycmVudCBzY29wZS4gU28gaXQgc2hvdWxkbid0IG9ic2VydmFibGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoaXMgZG9lc24ndCBhZmZlY3QgdGhlIGNhc2Ugd2hlcmUgdGhlIHNjb3BlIGNhbGxiYWNrIGlzIGFzeW5jLFxuICAgICAgICAvLyBiZWNhdXNlIHdlIGFsd2F5cyByZXF1aXJlIHRob3NlIGNhbGxzIHRvIGJlIGF3YWl0ZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRPRE86IEluIGEgZnV0dXJlIHZlcnNpb24sIGNvbnNpZGVyIGFsd2F5cyByZXF1aXJpbmcgYWxsIGBhY3RgIGNhbGxzXG4gICAgICAgIC8vIHRvIGJlIGF3YWl0ZWQsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgY2FsbGJhY2sgaXMgc3luYyBvciBhc3luYy5cblxuXG4gICAgICAgIFJlYWN0Q3VycmVudEFjdFF1ZXVlLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgZGlkQXdhaXRBY3RDYWxsID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChwcmV2QWN0U2NvcGVEZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGBhY3RgIGNhbGwgaXMgYXdhaXRlZCwgcmVzdG9yZSB0aGUgcXVldWUgd2Ugd2VyZVxuICAgICAgICAgICAgLy8gdXNpbmcgYmVmb3JlIChzZWUgbG9uZyBjb21tZW50IGFib3ZlKSBzbyB3ZSBjYW4gZmx1c2ggaXQuXG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5jdXJyZW50ID0gcXVldWU7XG4gICAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoLy8gUmVjdXJzaXZlbHkgZmx1c2ggdGFza3Mgc2NoZWR1bGVkIGJ5IGEgbWljcm90YXNrLlxuICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZWx5Rmx1c2hBc3luY0FjdFdvcmsocmV0dXJuVmFsdWUsIHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJldHVyblZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBvcEFjdFNjb3BlKHByZXZBY3RRdWV1ZSwgcHJldkFjdFNjb3BlRGVwdGgpIHtcbiAge1xuICAgIGlmIChwcmV2QWN0U2NvcGVEZXB0aCAhPT0gYWN0U2NvcGVEZXB0aCAtIDEpIHtcbiAgICAgIGVycm9yKCdZb3Ugc2VlbSB0byBoYXZlIG92ZXJsYXBwaW5nIGFjdCgpIGNhbGxzLCB0aGlzIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnQmUgc3VyZSB0byBhd2FpdCBwcmV2aW91cyBhY3QoKSBjYWxscyBiZWZvcmUgbWFraW5nIGEgbmV3IG9uZS4gJyk7XG4gICAgfVxuXG4gICAgYWN0U2NvcGVEZXB0aCA9IHByZXZBY3RTY29wZURlcHRoO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlY3Vyc2l2ZWx5Rmx1c2hBc3luY0FjdFdvcmsocmV0dXJuVmFsdWUsIHJlc29sdmUsIHJlamVjdCkge1xuICB7XG4gICAgLy8gQ2hlY2sgaWYgYW55IHRhc2tzIHdlcmUgc2NoZWR1bGVkIGFzeW5jaHJvbm91c2x5LlxuICAgIHZhciBxdWV1ZSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlLmN1cnJlbnQ7XG5cbiAgICBpZiAocXVldWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChxdWV1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgLy8gQXN5bmMgdGFza3Mgd2VyZSBzY2hlZHVsZWQsIG1vc3RseSBsaWtlbHkgaW4gYSBtaWNyb3Rhc2suXG4gICAgICAgIC8vIEtlZXAgZmx1c2hpbmcgdW50aWwgdGhlcmUgYXJlIG5vIG1vcmUuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZmx1c2hBY3RRdWV1ZShxdWV1ZSk7IC8vIFRoZSB3b3JrIHdlIGp1c3QgcGVyZm9ybWVkIG1heSBoYXZlIHNjaGVkdWxlIGFkZGl0aW9uYWwgYXN5bmNcbiAgICAgICAgICAvLyB0YXNrcy4gV2FpdCBhIG1hY3JvdGFzayBhbmQgY2hlY2sgYWdhaW4uXG5cbiAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBMZWF2ZSByZW1haW5pbmcgdGFza3Mgb24gdGhlIHF1ZXVlIGlmIHNvbWV0aGluZyB0aHJvd3MuXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHF1ZXVlIGlzIGVtcHR5LiBXZSBjYW4gZmluaXNoLlxuICAgICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUocmV0dXJuVmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgaXNGbHVzaGluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmbHVzaEFjdFF1ZXVlKHF1ZXVlKSB7XG4gIHtcbiAgICBpZiAoIWlzRmx1c2hpbmcpIHtcbiAgICAgIC8vIFByZXZlbnQgcmUtZW50cmFuY2UuXG4gICAgICBpc0ZsdXNoaW5nID0gdHJ1ZTtcbiAgICAgIHZhciBpID0gMDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICg7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50QWN0UXVldWUuZGlkVXNlUHJvbWlzZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGNvbnRpbnVhdGlvbiA9IGNhbGxiYWNrKGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRpbnVhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoUmVhY3RDdXJyZW50QWN0UXVldWUuZGlkVXNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBjb21wb25lbnQganVzdCBzdXNwZW5kZWQuIFlpZWxkIHRvIHRoZSBtYWluIHRocmVhZCBpblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgdGhlIHByb21pc2UgaXMgYWxyZWFkeSByZXNvbHZlZC4gSWYgc28sIGl0IHdpbGwgcGluZyBpblxuICAgICAgICAgICAgICAgIC8vIGEgbWljcm90YXNrIGFuZCB3ZSBjYW4gcmVzdW1lIHdpdGhvdXQgdW53aW5kaW5nIHRoZSBzdGFjay5cbiAgICAgICAgICAgICAgICBxdWV1ZVtpXSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIHF1ZXVlLnNwbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjYWxsYmFjayA9IGNvbnRpbnVhdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICB9IC8vIFdlIGZsdXNoZWQgdGhlIGVudGlyZSBxdWV1ZS5cblxuXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJZiBzb21ldGhpbmcgdGhyb3dzLCBsZWF2ZSB0aGUgcmVtYWluaW5nIGNhbGxiYWNrcyBvbiB0aGUgcXVldWUuXG4gICAgICAgIHF1ZXVlLnNwbGljZSgwLCBpICsgMSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaXNGbHVzaGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSAvLyBTb21lIG9mIG91ciB3YXJuaW5ncyBhdHRlbXB0IHRvIGRldGVjdCBpZiB0aGUgYGFjdGAgY2FsbCBpcyBhd2FpdGVkIGJ5XG4vLyBjaGVja2luZyBpbiBhbiBhc3luY2hyb25vdXMgdGFzay4gV2FpdCBhIGZldyBtaWNyb3Rhc2tzIGJlZm9yZSBjaGVja2luZy4gVGhlXG4vLyBvbmx5IHJlYXNvbiBvbmUgaXNuJ3Qgc3VmZmljaWVudCBpcyB3ZSB3YW50IHRvIGFjY29tbW9kYXRlIHRoZSBjYXNlIHdoZXJlIGFuXG4vLyBgYWN0YCBjYWxsIGlzIHJldHVybmVkIGZyb20gYW4gYXN5bmMgZnVuY3Rpb24gd2l0aG91dCBmaXJzdCBiZWluZyBhd2FpdGVkLFxuLy8gc2luY2UgdGhhdCdzIGEgc29tZXdoYXQgY29tbW9uIHBhdHRlcm4uIElmIHlvdSBkbyB0aGlzIHRvbyBtYW55IHRpbWVzIGluIGFcbi8vIG5lc3RlZCBzZXF1ZW5jZSwgeW91IG1pZ2h0IGdldCBhIHdhcm5pbmcsIGJ1dCB5b3UgY2FuIGFsd2F5cyBmaXggYnkgYXdhaXRpbmdcbi8vIHRoZSBjYWxsLlxuLy9cbi8vIEEgbWFjcm90YXNrIHdvdWxkIGFsc28gd29yayAoYW5kIGlzIHRoZSBmYWxsYmFjaykgYnV0IGRlcGVuZGluZyBvbiB0aGUgdGVzdFxuLy8gZW52aXJvbm1lbnQgaXQgbWF5IGNhdXNlIHRoZSB3YXJuaW5nIHRvIGZpcmUgdG9vIGxhdGUuXG5cblxudmFyIHF1ZXVlU2V2ZXJhbE1pY3JvdGFza3MgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgPT09ICdmdW5jdGlvbicgPyBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWV1ZU1pY3JvdGFzayhjYWxsYmFjayk7XG4gIH0pO1xufSA6IGVucXVldWVUYXNrO1xuXG52YXIgQ2hpbGRyZW4gPSB7XG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIG9ubHk6IG9ubHlDaGlsZFxufTtcblxuZXhwb3J0cy5DaGlsZHJlbiA9IENoaWxkcmVuO1xuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG5leHBvcnRzLkZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbmV4cG9ydHMuUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xuZXhwb3J0cy5QdXJlQ29tcG9uZW50ID0gUHVyZUNvbXBvbmVudDtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG5leHBvcnRzLlN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbmV4cG9ydHMuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQgPSBSZWFjdFNoYXJlZEludGVybmFscztcbmV4cG9ydHMuYWN0ID0gYWN0O1xuZXhwb3J0cy5jYWNoZSA9IGNhY2hlO1xuZXhwb3J0cy5jbG9uZUVsZW1lbnQgPSBjbG9uZUVsZW1lbnQ7XG5leHBvcnRzLmNyZWF0ZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0O1xuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmV4cG9ydHMuY3JlYXRlRmFjdG9yeSA9IGNyZWF0ZUZhY3Rvcnk7XG5leHBvcnRzLmNyZWF0ZVJlZiA9IGNyZWF0ZVJlZjtcbmV4cG9ydHMuZm9yd2FyZFJlZiA9IGZvcndhcmRSZWY7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50ID0gaXNWYWxpZEVsZW1lbnQ7XG5leHBvcnRzLmxhenkgPSBsYXp5O1xuZXhwb3J0cy5tZW1vID0gbWVtbztcbmV4cG9ydHMuc3RhcnRUcmFuc2l0aW9uID0gc3RhcnRUcmFuc2l0aW9uO1xuZXhwb3J0cy51bnN0YWJsZV91c2VDYWNoZVJlZnJlc2ggPSB1c2VDYWNoZVJlZnJlc2g7XG5leHBvcnRzLnVzZSA9IHVzZTtcbmV4cG9ydHMudXNlQ2FsbGJhY2sgPSB1c2VDYWxsYmFjaztcbmV4cG9ydHMudXNlQ29udGV4dCA9IHVzZUNvbnRleHQ7XG5leHBvcnRzLnVzZURlYnVnVmFsdWUgPSB1c2VEZWJ1Z1ZhbHVlO1xuZXhwb3J0cy51c2VEZWZlcnJlZFZhbHVlID0gdXNlRGVmZXJyZWRWYWx1ZTtcbmV4cG9ydHMudXNlRWZmZWN0ID0gdXNlRWZmZWN0O1xuZXhwb3J0cy51c2VJZCA9IHVzZUlkO1xuZXhwb3J0cy51c2VJbXBlcmF0aXZlSGFuZGxlID0gdXNlSW1wZXJhdGl2ZUhhbmRsZTtcbmV4cG9ydHMudXNlSW5zZXJ0aW9uRWZmZWN0ID0gdXNlSW5zZXJ0aW9uRWZmZWN0O1xuZXhwb3J0cy51c2VMYXlvdXRFZmZlY3QgPSB1c2VMYXlvdXRFZmZlY3Q7XG5leHBvcnRzLnVzZU1lbW8gPSB1c2VNZW1vO1xuZXhwb3J0cy51c2VPcHRpbWlzdGljID0gdXNlT3B0aW1pc3RpYztcbmV4cG9ydHMudXNlUmVkdWNlciA9IHVzZVJlZHVjZXI7XG5leHBvcnRzLnVzZVJlZiA9IHVzZVJlZjtcbmV4cG9ydHMudXNlU3RhdGUgPSB1c2VTdGF0ZTtcbmV4cG9ydHMudXNlU3luY0V4dGVybmFsU3RvcmUgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZTtcbmV4cG9ydHMudXNlVHJhbnNpdGlvbiA9IHVzZVRyYW5zaXRpb247XG5leHBvcnRzLnZlcnNpb24gPSBSZWFjdFZlcnNpb247XG4gICAgICAgICAgLyogZ2xvYmFsIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAqL1xuaWYgKFxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICE9PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdG9wID09PVxuICAgICdmdW5jdGlvbidcbikge1xuICBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AobmV3IEVycm9yKCkpO1xufVxuICAgICAgICBcbiAgfSkoKTtcbn1cbiIsCiAgIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwKICAiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QtanN4LWRldi1ydW50aW1lLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vLyBBVFRFTlRJT05cbi8vIFdoZW4gYWRkaW5nIG5ldyBzeW1ib2xzIHRvIHRoaXMgZmlsZSxcbi8vIFBsZWFzZSBjb25zaWRlciBhbHNvIGFkZGluZyB0byAncmVhY3QtZGV2dG9vbHMtc2hhcmVkL3NyYy9iYWNrZW5kL1JlYWN0U3ltYm9scydcbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKTtcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpOyAvLyBUT0RPOiBEZWxldGUgd2l0aCBlbmFibGVSZW5kZXJhYmxlQ29udGV4dFxuXG52YXIgUkVBQ1RfQ09OU1VNRVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnN1bWVyJyk7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJyk7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubGF6eScpO1xudmFyIFJFQUNUX09GRlNDUkVFTl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Qub2Zmc2NyZWVuJyk7XG52YXIgUkVBQ1RfQ0FDSEVfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNhY2hlJyk7XG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIGlmIChtYXliZUl0ZXJhYmxlID09PSBudWxsIHx8IHR5cGVvZiBtYXliZUl0ZXJhYmxlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuXG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuXG5mdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAge1xuICAgIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZygnZXJyb3InLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICBmb3JtYXQgKz0gJyVzJztcbiAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuXG5cbiAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpdGVtKTtcbiAgICB9KTsgLy8gQ2FyZWZ1bDogUk4gY3VycmVudGx5IGRlcGVuZHMgb24gdGhpcyBwcmVmaXhcblxuICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpOyAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nXG5cbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlW2xldmVsXSwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBlbmFibGVTY29wZUFQSSA9IGZhbHNlOyAvLyBFeHBlcmltZW50YWwgQ3JlYXRlIEV2ZW50IEhhbmRsZSBBUEkuXG52YXIgZW5hYmxlQ2FjaGVFbGVtZW50ID0gZmFsc2U7XG52YXIgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgPSBmYWxzZTsgLy8gTm8ga25vd24gYnVncywgYnV0IG5lZWRzIHBlcmZvcm1hbmNlIHRlc3RpbmdcblxudmFyIGVuYWJsZUxlZ2FjeUhpZGRlbiA9IGZhbHNlOyAvLyBFbmFibGVzIHVuc3RhYmxlX2F2b2lkVGhpc0ZhbGxiYWNrIGZlYXR1cmUgaW4gRmliZXJcbnZhciBlbmFibGVSZW5kZXJhYmxlQ29udGV4dCA9IGZhbHNlO1xuLy8gc3R1ZmYuIEludGVuZGVkIHRvIGVuYWJsZSBSZWFjdCBjb3JlIG1lbWJlcnMgdG8gbW9yZSBlYXNpbHkgZGVidWcgc2NoZWR1bGluZ1xuLy8gaXNzdWVzIGluIERFViBidWlsZHMuXG5cbnZhciBlbmFibGVEZWJ1Z1RyYWNpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IG91dGVyVHlwZS5kaXNwbGF5TmFtZTtcblxuICBpZiAoZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gZGlzcGxheU5hbWU7XG4gIH1cblxuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb25OYW1lICE9PSAnJyA/IHdyYXBwZXJOYW1lICsgXCIoXCIgKyBmdW5jdGlvbk5hbWUgKyBcIilcIiA6IHdyYXBwZXJOYW1lO1xufSAvLyBLZWVwIGluIHN5bmMgd2l0aCByZWFjdC1yZWNvbmNpbGVyL2dldENvbXBvbmVudE5hbWVGcm9tRmliZXJcblxuXG5mdW5jdGlvbiBnZXRDb250ZXh0TmFtZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8ICdDb250ZXh0Jztcbn1cblxudmFyIFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0UkMiA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNsaWVudC5yZWZlcmVuY2UnKTsgLy8gTm90ZSB0aGF0IHRoZSByZWNvbmNpbGVyIHBhY2thZ2Ugc2hvdWxkIGdlbmVyYWxseSBwcmVmZXIgdG8gdXNlIGdldENvbXBvbmVudE5hbWVGcm9tRmliZXIoKSBpbnN0ZWFkLlxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRSQyKSB7XG4gICAgICAvLyBUT0RPOiBDcmVhdGUgYSBjb252ZW50aW9uIGZvciBuYW1pbmcgY2xpZW50IHJlZmVyZW5jZXMgd2l0aCBkZWJ1ZyBpbmZvLlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICByZXR1cm4gJ0ZyYWdtZW50JztcblxuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1BvcnRhbCc7XG5cbiAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICByZXR1cm4gJ1Byb2ZpbGVyJztcblxuICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnU3RyaWN0TW9kZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuXG4gICAgY2FzZSBSRUFDVF9DQUNIRV9UWVBFOlxuICAgICAge1xuICAgICAgICByZXR1cm4gJ0NhY2hlJztcbiAgICAgIH1cblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoKS4gJyArICdUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcHJvdmlkZXIgPSB0eXBlO1xuICAgICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShwcm92aWRlci5fY29udGV4dCkgKyAnLlByb3ZpZGVyJztcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0eXBlO1xuXG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q29udGV4dE5hbWUoY29udGV4dCkgKyAnLkNvbnN1bWVyJztcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0NPTlNVTUVSX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHZhciBvdXRlck5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKG91dGVyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvdXRlck5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ01lbW8nO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoaW5pdChwYXlsb2FkKSk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vICRGbG93Rml4TWVbbWV0aG9kLXVuYmluZGluZ11cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vKlxuICogVGhlIGAnJyArIHZhbHVlYCBwYXR0ZXJuICh1c2VkIGluIHBlcmYtc2Vuc2l0aXZlIGNvZGUpIHRocm93cyBmb3IgU3ltYm9sXG4gKiBhbmQgVGVtcG9yYWwuKiB0eXBlcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzIyMDY0LlxuICpcbiAqIFRoZSBmdW5jdGlvbnMgaW4gdGhpcyBtb2R1bGUgd2lsbCB0aHJvdyBhbiBlYXNpZXItdG8tdW5kZXJzdGFuZCxcbiAqIGVhc2llci10by1kZWJ1ZyBleGNlcHRpb24gd2l0aCBhIGNsZWFyIGVycm9ycyBtZXNzYWdlIG1lc3NhZ2UgZXhwbGFpbmluZyB0aGVcbiAqIHByb2JsZW0uIChJbnN0ZWFkIG9mIGEgY29uZnVzaW5nIGV4Y2VwdGlvbiB0aHJvd24gaW5zaWRlIHRoZSBpbXBsZW1lbnRhdGlvblxuICogb2YgdGhlIGB2YWx1ZWAgb2JqZWN0KS5cbiAqL1xuLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cbmZ1bmN0aW9uIHR5cGVOYW1lKHZhbHVlKSB7XG4gIHtcbiAgICAvLyB0b1N0cmluZ1RhZyBpcyBuZWVkZWQgZm9yIG5hbWVzcGFjZWQgdHlwZXMgbGlrZSBUZW1wb3JhbC5JbnN0YW50XG4gICAgdmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wudG9TdHJpbmdUYWc7XG4gICAgdmFyIHR5cGUgPSBoYXNUb1N0cmluZ1RhZyAmJiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ09iamVjdCc7IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cblxuICAgIHJldHVybiB0eXBlO1xuICB9XG59IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl0gb25seSBjYWxsZWQgaW4gREVWLCBzbyB2b2lkIHJldHVybiBpcyBub3QgcG9zc2libGUuXG5cblxuZnVuY3Rpb24gd2lsbENvZXJjaW9uVGhyb3codmFsdWUpIHtcbiAge1xuICAgIHRyeSB7XG4gICAgICB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgLy8gSWYgeW91IGVuZGVkIHVwIGhlcmUgYnkgZm9sbG93aW5nIGFuIGV4Y2VwdGlvbiBjYWxsIHN0YWNrLCBoZXJlJ3Mgd2hhdCdzXG4gIC8vIGhhcHBlbmVkOiB5b3Ugc3VwcGxpZWQgYW4gb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBSZWFjdCAoYXMgYSBwcm9wLCBrZXksXG4gIC8vIERPTSBhdHRyaWJ1dGUsIENTUyBwcm9wZXJ0eSwgc3RyaW5nIHJlZiwgZXRjLikgYW5kIHdoZW4gUmVhY3QgdHJpZWQgdG9cbiAgLy8gY29lcmNlIGl0IHRvIGEgc3RyaW5nIHVzaW5nIGAnJyArIHZhbHVlYCwgYW4gZXhjZXB0aW9uIHdhcyB0aHJvd24uXG4gIC8vXG4gIC8vIFRoZSBtb3N0IGNvbW1vbiB0eXBlcyB0aGF0IHdpbGwgY2F1c2UgdGhpcyBleGNlcHRpb24gYXJlIGBTeW1ib2xgIGluc3RhbmNlc1xuICAvLyBhbmQgVGVtcG9yYWwgb2JqZWN0cyBsaWtlIGBUZW1wb3JhbC5JbnN0YW50YC4gQnV0IGFueSBvYmplY3QgdGhhdCBoYXMgYVxuICAvLyBgdmFsdWVPZmAgb3IgYFtTeW1ib2wudG9QcmltaXRpdmVdYCBtZXRob2QgdGhhdCB0aHJvd3Mgd2lsbCBhbHNvIGNhdXNlIHRoaXNcbiAgLy8gZXhjZXB0aW9uLiAoTGlicmFyeSBhdXRob3JzIGRvIHRoaXMgdG8gcHJldmVudCB1c2VycyBmcm9tIHVzaW5nIGJ1aWx0LWluXG4gIC8vIG51bWVyaWMgb3BlcmF0b3JzIGxpa2UgYCtgIG9yIGNvbXBhcmlzb24gb3BlcmF0b3JzIGxpa2UgYD49YCBiZWNhdXNlIGN1c3RvbVxuICAvLyBtZXRob2RzIGFyZSBuZWVkZWQgdG8gcGVyZm9ybSBhY2N1cmF0ZSBhcml0aG1ldGljIG9yIGNvbXBhcmlzb24uKVxuICAvL1xuICAvLyBUbyBmaXggdGhlIHByb2JsZW0sIGNvZXJjZSB0aGlzIG9iamVjdCBvciBzeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcgYmVmb3JlXG4gIC8vIHBhc3NpbmcgaXQgdG8gUmVhY3QuIFRoZSBtb3N0IHJlbGlhYmxlIHdheSBpcyB1c3VhbGx5IGBTdHJpbmcodmFsdWUpYC5cbiAgLy9cbiAgLy8gVG8gZmluZCB3aGljaCB2YWx1ZSBpcyB0aHJvd2luZywgY2hlY2sgdGhlIGJyb3dzZXIgb3IgZGVidWdnZXIgY29uc29sZS5cbiAgLy8gQmVmb3JlIHRoaXMgZXhjZXB0aW9uIHdhcyB0aHJvd24sIHRoZXJlIHNob3VsZCBiZSBgY29uc29sZS5lcnJvcmAgb3V0cHV0XG4gIC8vIHRoYXQgc2hvd3MgdGhlIHR5cGUgKFN5bWJvbCwgVGVtcG9yYWwuUGxhaW5EYXRlLCBldGMuKSB0aGF0IGNhdXNlZCB0aGVcbiAgLy8gcHJvYmxlbSBhbmQgaG93IHRoYXQgdHlwZSB3YXMgdXNlZDoga2V5LCBhdHJyaWJ1dGUsIGlucHV0IHZhbHVlIHByb3AsIGV0Yy5cbiAgLy8gSW4gbW9zdCBjYXNlcywgdGhpcyBjb25zb2xlIG91dHB1dCBhbHNvIHNob3dzIHRoZSBjb21wb25lbnQgYW5kIGl0c1xuICAvLyBhbmNlc3RvciBjb21wb25lbnRzIHdoZXJlIHRoZSBleGNlcHRpb24gaGFwcGVuZWQuXG4gIC8vXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuICByZXR1cm4gJycgKyB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAge1xuICAgIGlmICh3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkpIHtcbiAgICAgIGVycm9yKCdUaGUgcHJvdmlkZWQga2V5IGlzIGFuIHVuc3VwcG9ydGVkIHR5cGUgJXMuJyArICcgVGhpcyB2YWx1ZSBtdXN0IGJlIGNvZXJjZWQgdG8gYSBzdHJpbmcgYmVmb3JlIHVzaW5nIGl0IGhlcmUuJywgdHlwZU5hbWUodmFsdWUpKTtcblxuICAgICAgcmV0dXJuIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7IC8vIHRocm93ICh0byBoZWxwIGNhbGxlcnMgZmluZCB0cm91Ymxlc2hvb3RpbmcgY29tbWVudHMpXG4gICAgfVxuICB9XG59XG5cbnZhciBSRUFDVF9DTElFTlRfUkVGRVJFTkNFJDEgPSBTeW1ib2wuZm9yKCdyZWFjdC5jbGllbnQucmVmZXJlbmNlJyk7XG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gTm90ZTogdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgKGUuZy4gaWYgaXQncyBhIHBvbHlmaWxsKS5cblxuXG4gIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgZW5hYmxlRGVidWdUcmFjaW5nICB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IGVuYWJsZUxlZ2FjeUhpZGRlbiAgfHwgdHlwZSA9PT0gUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgfHwgZW5hYmxlU2NvcGVBUEkgIHx8IGVuYWJsZUNhY2hlRWxlbWVudCAgfHwgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCBlbmFibGVSZW5kZXJhYmxlQ29udGV4dCAgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCAvLyBUaGlzIG5lZWRzIHRvIGluY2x1ZGUgYWxsIHBvc3NpYmxlIG1vZHVsZSByZWZlcmVuY2Ugb2JqZWN0XG4gICAgLy8gdHlwZXMgc3VwcG9ydGVkIGJ5IGFueSBGbGlnaHQgY29uZmlndXJhdGlvbiBhbnl3aGVyZSBzaW5jZVxuICAgIC8vIHdlIGRvbid0IGtub3cgd2hpY2ggRmxpZ2h0IGJ1aWxkIHRoaXMgd2lsbCBlbmQgdXAgYmVpbmcgdXNlZFxuICAgIC8vIHdpdGguXG4gICAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRSQxIHx8IHR5cGUuZ2V0TW9kdWxlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgaXNBcnJheUltcGwgPSBBcnJheS5pc0FycmF5OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYSkge1xuICByZXR1cm4gaXNBcnJheUltcGwoYSk7XG59XG5cbi8vIEhlbHBlcnMgdG8gcGF0Y2ggY29uc29sZS5sb2dzIHRvIGF2b2lkIGxvZ2dpbmcgZHVyaW5nIHNpZGUtZWZmZWN0IGZyZWVcbi8vIHJlcGxheWluZyBvbiByZW5kZXIgZnVuY3Rpb24uIFRoaXMgY3VycmVudGx5IG9ubHkgcGF0Y2hlcyB0aGUgb2JqZWN0XG4vLyBsYXppbHkgd2hpY2ggd29uJ3QgY292ZXIgaWYgdGhlIGxvZyBmdW5jdGlvbiB3YXMgZXh0cmFjdGVkIGVhZ2VybHkuXG4vLyBXZSBjb3VsZCBhbHNvIGVhZ2VybHkgcGF0Y2ggdGhlIG1ldGhvZC5cbnZhciBkaXNhYmxlZERlcHRoID0gMDtcbnZhciBwcmV2TG9nO1xudmFyIHByZXZJbmZvO1xudmFyIHByZXZXYXJuO1xudmFyIHByZXZFcnJvcjtcbnZhciBwcmV2R3JvdXA7XG52YXIgcHJldkdyb3VwQ29sbGFwc2VkO1xudmFyIHByZXZHcm91cEVuZDtcblxuZnVuY3Rpb24gZGlzYWJsZWRMb2coKSB7fVxuXG5kaXNhYmxlZExvZy5fX3JlYWN0RGlzYWJsZWRMb2cgPSB0cnVlO1xuZnVuY3Rpb24gZGlzYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICBwcmV2TG9nID0gY29uc29sZS5sb2c7XG4gICAgICBwcmV2SW5mbyA9IGNvbnNvbGUuaW5mbztcbiAgICAgIHByZXZXYXJuID0gY29uc29sZS53YXJuO1xuICAgICAgcHJldkVycm9yID0gY29uc29sZS5lcnJvcjtcbiAgICAgIHByZXZHcm91cCA9IGNvbnNvbGUuZ3JvdXA7XG4gICAgICBwcmV2R3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkO1xuICAgICAgcHJldkdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZDsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xOTA5OVxuXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGRpc2FibGVkTG9nLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfTsgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgIGluZm86IHByb3BzLFxuICAgICAgICBsb2c6IHByb3BzLFxuICAgICAgICB3YXJuOiBwcm9wcyxcbiAgICAgICAgZXJyb3I6IHByb3BzLFxuICAgICAgICBncm91cDogcHJvcHMsXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBwcm9wcyxcbiAgICAgICAgZ3JvdXBFbmQ6IHByb3BzXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgZGlzYWJsZWREZXB0aCsrO1xuICB9XG59XG5mdW5jdGlvbiByZWVuYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBkaXNhYmxlZERlcHRoLS07XG5cbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXSBGbG93IHRoaW5rcyBjb25zb2xlIGlzIGltbXV0YWJsZS5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29uc29sZSwge1xuICAgICAgICBsb2c6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkxvZ1xuICAgICAgICB9KSxcbiAgICAgICAgaW5mbzogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2SW5mb1xuICAgICAgICB9KSxcbiAgICAgICAgd2FybjogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2V2FyblxuICAgICAgICB9KSxcbiAgICAgICAgZXJyb3I6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkVycm9yXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cENvbGxhcHNlZFxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXBFbmQ6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwRW5kXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgaWYgKGRpc2FibGVkRGVwdGggPCAwKSB7XG4gICAgICBlcnJvcignZGlzYWJsZWREZXB0aCBmZWxsIGJlbG93IHplcm8uICcgKyAnVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgfVxuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbnZhciBwcmVmaXg7XG5mdW5jdGlvbiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lLCBvd25lckZuKSB7XG4gIHtcbiAgICBpZiAocHJlZml4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEV4dHJhY3QgdGhlIFZNIHNwZWNpZmljIHByZWZpeCB1c2VkIGJ5IGVhY2ggbGluZS5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHguc3RhY2sudHJpbSgpLm1hdGNoKC9cXG4oICooYXQgKT8pLyk7XG4gICAgICAgIHByZWZpeCA9IG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xuICAgICAgfVxuICAgIH0gLy8gV2UgdXNlIHRoZSBwcmVmaXggdG8gZW5zdXJlIG91ciBzdGFja3MgbGluZSB1cCB3aXRoIG5hdGl2ZSBzdGFjayBmcmFtZXMuXG5cblxuICAgIHJldHVybiAnXFxuJyArIHByZWZpeCArIG5hbWU7XG4gIH1cbn1cbnZhciByZWVudHJ5ID0gZmFsc2U7XG52YXIgY29tcG9uZW50RnJhbWVDYWNoZTtcblxue1xuICB2YXIgUG9zc2libHlXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgPyBXZWFrTWFwIDogTWFwO1xuICBjb21wb25lbnRGcmFtZUNhY2hlID0gbmV3IFBvc3NpYmx5V2Vha01hcCgpO1xufVxuLyoqXG4gKiBMZXZlcmFnZXMgbmF0aXZlIGJyb3dzZXIvVk0gc3RhY2sgZnJhbWVzIHRvIGdldCBwcm9wZXIgZGV0YWlscyAoZS5nLlxuICogZmlsZW5hbWUsIGxpbmUgKyBjb2wgbnVtYmVyKSBmb3IgYSBzaW5nbGUgY29tcG9uZW50IGluIGEgY29tcG9uZW50IHN0YWNrLiBXZVxuICogZG8gdGhpcyBieTpcbiAqICAgKDEpIHRocm93aW5nIGFuZCBjYXRjaGluZyBhbiBlcnJvciBpbiB0aGUgZnVuY3Rpb24gLSB0aGlzIHdpbGwgYmUgb3VyXG4gKiAgICAgICBjb250cm9sIGVycm9yLlxuICogICAoMikgY2FsbGluZyB0aGUgY29tcG9uZW50IHdoaWNoIHdpbGwgZXZlbnR1YWxseSB0aHJvdyBhbiBlcnJvciB0aGF0IHdlJ2xsXG4gKiAgICAgICBjYXRjaCAtIHRoaXMgd2lsbCBiZSBvdXIgc2FtcGxlIGVycm9yLlxuICogICAoMykgZGlmZmluZyB0aGUgY29udHJvbCBhbmQgc2FtcGxlIGVycm9yIHN0YWNrcyB0byBmaW5kIHRoZSBzdGFjayBmcmFtZVxuICogICAgICAgd2hpY2ggcmVwcmVzZW50cyBvdXIgY29tcG9uZW50LlxuICovXG5cblxuZnVuY3Rpb24gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZShmbiwgY29uc3RydWN0KSB7XG4gIC8vIElmIHNvbWV0aGluZyBhc2tlZCBmb3IgYSBzdGFjayBpbnNpZGUgYSBmYWtlIHJlbmRlciwgaXQgc2hvdWxkIGdldCBpZ25vcmVkLlxuICBpZiAoIWZuIHx8IHJlZW50cnkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB7XG4gICAgdmFyIGZyYW1lID0gY29tcG9uZW50RnJhbWVDYWNoZS5nZXQoZm4pO1xuXG4gICAgaWYgKGZyYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG4gIH1cblxuICByZWVudHJ5ID0gdHJ1ZTtcbiAgdmFyIHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2UgPSBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZTsgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV0gSXQgZG9lcyBhY2NlcHQgdW5kZWZpbmVkLlxuXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gdW5kZWZpbmVkO1xuICB2YXIgcHJldmlvdXNEaXNwYXRjaGVyO1xuXG4gIHtcbiAgICBwcmV2aW91c0Rpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQ7IC8vIFNldCB0aGUgZGlzcGF0Y2hlciBpbiBERVYgYmVjYXVzZSB0aGlzIG1pZ2h0IGJlIGNhbGwgaW4gdGhlIHJlbmRlciBmdW5jdGlvblxuICAgIC8vIGZvciB3YXJuaW5ncy5cblxuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IG51bGw7XG4gICAgZGlzYWJsZUxvZ3MoKTtcbiAgfVxuICAvKipcbiAgICogRmluZGluZyBhIGNvbW1vbiBzdGFjayBmcmFtZSBiZXR3ZWVuIHNhbXBsZSBhbmQgY29udHJvbCBlcnJvcnMgY2FuIGJlXG4gICAqIHRyaWNreSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzIGFuZCBsZXZlbHMgb2Ygc3RhY2sgdHJhY2UgdHJ1bmNhdGlvbiBmcm9tXG4gICAqIGRpZmZlcmVudCBKUyBWTXMuIFNvIGluc3RlYWQgd2UnbGwgYXR0ZW1wdCB0byBjb250cm9sIHdoYXQgdGhhdCBjb21tb25cbiAgICogZnJhbWUgc2hvdWxkIGJlIHRocm91Z2ggdGhpcyBvYmplY3QgbWV0aG9kOlxuICAgKiBIYXZpbmcgYm90aCB0aGUgc2FtcGxlIGFuZCBjb250cm9sIGVycm9ycyBiZSBpbiB0aGUgZnVuY3Rpb24gdW5kZXIgdGhlXG4gICAqIGBEZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lUm9vdGAgcHJvcGVydHksICsgc2V0dGluZyB0aGUgYG5hbWVgIGFuZFxuICAgKiBgZGlzcGxheU5hbWVgIHByb3BlcnRpZXMgb2YgdGhlIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBhIHN0YWNrXG4gICAqIGZyYW1lIGV4aXN0cyB0aGF0IGhhcyB0aGUgbWV0aG9kIG5hbWUgYERlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWVSb290YCBpblxuICAgKiBpdCBmb3IgYm90aCBjb250cm9sIGFuZCBzYW1wbGUgc3RhY2tzLlxuICAgKi9cblxuXG4gIHZhciBSdW5JblJvb3RGcmFtZSA9IHtcbiAgICBEZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250cm9sO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHNob3VsZCB0aHJvdy5cbiAgICAgICAgaWYgKGNvbnN0cnVjdCkge1xuICAgICAgICAgIC8vIFNvbWV0aGluZyBzaG91bGQgYmUgc2V0dGluZyB0aGUgcHJvcHMgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgIHZhciBGYWtlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICB9OyAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cblxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZha2UucHJvdG90eXBlLCAncHJvcHMnLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gV2UgdXNlIGEgdGhyb3dpbmcgc2V0dGVyIGluc3RlYWQgb2YgZnJvemVuIG9yIG5vbi13cml0YWJsZSBwcm9wc1xuICAgICAgICAgICAgICAvLyBiZWNhdXNlIHRoYXQgd29uJ3QgdGhyb3cgaW4gYSBub24tc3RyaWN0IG1vZGUgZnVuY3Rpb24uXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnICYmIFJlZmxlY3QuY29uc3RydWN0KSB7XG4gICAgICAgICAgICAvLyBXZSBjb25zdHJ1Y3QgYSBkaWZmZXJlbnQgY29udHJvbCBmb3IgdGhpcyBjYXNlIHRvIGluY2x1ZGUgYW55IGV4dHJhXG4gICAgICAgICAgICAvLyBmcmFtZXMgYWRkZWQgYnkgdGhlIGNvbnN0cnVjdCBjYWxsLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoRmFrZSwgW10pO1xuICAgICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoZm4sIFtdLCBGYWtlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgRmFrZS5jYWxsKCk7XG4gICAgICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICAgICAgfSAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ10gZm91bmQgd2hlbiB1cGdyYWRpbmcgRmxvd1xuXG5cbiAgICAgICAgICAgIGZuLmNhbGwoRmFrZS5wcm90b3R5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgICB9IC8vIFRPRE8obHVuYSk6IFRoaXMgd2lsbCBjdXJyZW50bHkgb25seSB0aHJvdyBpZiB0aGUgZnVuY3Rpb24gY29tcG9uZW50XG4gICAgICAgICAgLy8gdHJpZXMgdG8gYWNjZXNzIFJlYWN0L1JlYWN0RE9NL3Byb3BzLiBXZSBzaG91bGQgcHJvYmFibHkgbWFrZSB0aGlzIHRocm93XG4gICAgICAgICAgLy8gaW4gc2ltcGxlIGNvbXBvbmVudHMgdG9vXG5cblxuICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSBmbigpOyAvLyBJZiB0aGUgZnVuY3Rpb24gY29tcG9uZW50IHJldHVybnMgYSBwcm9taXNlLCBpdCdzIGxpa2VseSBhbiBhc3luY1xuICAgICAgICAgIC8vIGNvbXBvbmVudCwgd2hpY2ggd2UgZG9uJ3QgeWV0IHN1cHBvcnQuIEF0dGFjaCBhIG5vb3AgY2F0Y2ggaGFuZGxlciB0b1xuICAgICAgICAgIC8vIHNpbGVuY2UgdGhlIGVycm9yLlxuICAgICAgICAgIC8vIFRPRE86IEltcGxlbWVudCBjb21wb25lbnQgc3RhY2tzIGZvciBhc3luYyBjbGllbnQgY29tcG9uZW50cz9cblxuICAgICAgICAgIGlmIChtYXliZVByb21pc2UgJiYgdHlwZW9mIG1heWJlUHJvbWlzZS5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlLmNhdGNoKGZ1bmN0aW9uICgpIHt9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKHNhbXBsZSkge1xuICAgICAgICAvLyBUaGlzIGlzIGlubGluZWQgbWFudWFsbHkgYmVjYXVzZSBjbG9zdXJlIGRvZXNuJ3QgZG8gaXQgZm9yIHVzLlxuICAgICAgICBpZiAoc2FtcGxlICYmIGNvbnRyb2wgJiYgdHlwZW9mIHNhbXBsZS5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gW3NhbXBsZS5zdGFjaywgY29udHJvbC5zdGFja107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICB9XG4gIH07IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuXG4gIFJ1bkluUm9vdEZyYW1lLkRldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdC5kaXNwbGF5TmFtZSA9ICdEZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3QnO1xuICB2YXIgbmFtZVByb3BEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihSdW5JblJvb3RGcmFtZS5EZXRlcm1pbmVDb21wb25lbnRGcmFtZVJvb3QsICduYW1lJyk7IC8vIEJlZm9yZSBFUzYsIHRoZSBgbmFtZWAgcHJvcGVydHkgd2FzIG5vdCBjb25maWd1cmFibGUuXG5cbiAgaWYgKG5hbWVQcm9wRGVzY3JpcHRvciAmJiBuYW1lUHJvcERlc2NyaXB0b3IuY29uZmlndXJhYmxlKSB7XG4gICAgLy8gVjggdXRpbGl6ZXMgYSBmdW5jdGlvbidzIGBuYW1lYCBwcm9wZXJ0eSB3aGVuIGdlbmVyYXRpbmcgYSBzdGFjayB0cmFjZS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUnVuSW5Sb290RnJhbWUuRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290LCAvLyBDb25maWd1cmFibGUgcHJvcGVydGllcyBjYW4gYmUgdXBkYXRlZCBldmVuIGlmIGl0cyB3cml0YWJsZSBkZXNjcmlwdG9yXG4gICAgLy8gaXMgc2V0IHRvIGBmYWxzZWAuXG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG4gICAgJ25hbWUnLCB7XG4gICAgICB2YWx1ZTogJ0RldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdCdcbiAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdmFyIF9SdW5JblJvb3RGcmFtZSREZXRlciA9IFJ1bkluUm9vdEZyYW1lLkRldGVybWluZUNvbXBvbmVudEZyYW1lUm9vdCgpLFxuICAgICAgICBzYW1wbGVTdGFjayA9IF9SdW5JblJvb3RGcmFtZSREZXRlclswXSxcbiAgICAgICAgY29udHJvbFN0YWNrID0gX1J1bkluUm9vdEZyYW1lJERldGVyWzFdO1xuXG4gICAgaWYgKHNhbXBsZVN0YWNrICYmIGNvbnRyb2xTdGFjaykge1xuICAgICAgLy8gVGhpcyBleHRyYWN0cyB0aGUgZmlyc3QgZnJhbWUgZnJvbSB0aGUgc2FtcGxlIHRoYXQgaXNuJ3QgYWxzbyBpbiB0aGUgY29udHJvbC5cbiAgICAgIC8vIFNraXBwaW5nIG9uZSBmcmFtZSB0aGF0IHdlIGFzc3VtZSBpcyB0aGUgZnJhbWUgdGhhdCBjYWxscyB0aGUgdHdvLlxuICAgICAgdmFyIHNhbXBsZUxpbmVzID0gc2FtcGxlU3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgdmFyIGNvbnRyb2xMaW5lcyA9IGNvbnRyb2xTdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgcyA9IDA7XG4gICAgICB2YXIgYyA9IDA7XG5cbiAgICAgIHdoaWxlIChzIDwgc2FtcGxlTGluZXMubGVuZ3RoICYmICFzYW1wbGVMaW5lc1tzXS5pbmNsdWRlcygnRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290JykpIHtcbiAgICAgICAgcysrO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoYyA8IGNvbnRyb2xMaW5lcy5sZW5ndGggJiYgIWNvbnRyb2xMaW5lc1tjXS5pbmNsdWRlcygnRGV0ZXJtaW5lQ29tcG9uZW50RnJhbWVSb290JykpIHtcbiAgICAgICAgYysrO1xuICAgICAgfSAvLyBXZSBjb3VsZG4ndCBmaW5kIG91ciBpbnRlbnRpb25hbGx5IGluamVjdGVkIGNvbW1vbiByb290IGZyYW1lLCBhdHRlbXB0XG4gICAgICAvLyB0byBmaW5kIGFub3RoZXIgY29tbW9uIHJvb3QgZnJhbWUgYnkgc2VhcmNoIGZyb20gdGhlIGJvdHRvbSBvZiB0aGVcbiAgICAgIC8vIGNvbnRyb2wgc3RhY2suLi5cblxuXG4gICAgICBpZiAocyA9PT0gc2FtcGxlTGluZXMubGVuZ3RoIHx8IGMgPT09IGNvbnRyb2xMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgcyA9IHNhbXBsZUxpbmVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGMgPSBjb250cm9sTGluZXMubGVuZ3RoIC0gMTtcblxuICAgICAgICB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCAmJiBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgLy8gV2UgZXhwZWN0IGF0IGxlYXN0IG9uZSBzdGFjayBmcmFtZSB0byBiZSBzaGFyZWQuXG4gICAgICAgICAgLy8gVHlwaWNhbGx5IHRoaXMgd2lsbCBiZSB0aGUgcm9vdCBtb3N0IG9uZS4gSG93ZXZlciwgc3RhY2sgZnJhbWVzIG1heSBiZVxuICAgICAgICAgIC8vIGN1dCBvZmYgZHVlIHRvIG1heGltdW0gc3RhY2sgbGltaXRzLiBJbiB0aGlzIGNhc2UsIG9uZSBtYXliZSBjdXQgb2ZmXG4gICAgICAgICAgLy8gZWFybGllciB0aGFuIHRoZSBvdGhlci4gV2UgYXNzdW1lIHRoYXQgdGhlIHNhbXBsZSBpcyBsb25nZXIgb3IgdGhlIHNhbWVcbiAgICAgICAgICAvLyBhbmQgdGhlcmUgZm9yIGN1dCBvZmYgZWFybGllci4gU28gd2Ugc2hvdWxkIGZpbmQgdGhlIHJvb3QgbW9zdCBmcmFtZSBpblxuICAgICAgICAgIC8vIHRoZSBzYW1wbGUgc29tZXdoZXJlIGluIHRoZSBjb250cm9sLlxuICAgICAgICAgIGMtLTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKDsgcyA+PSAxICYmIGMgPj0gMDsgcy0tLCBjLS0pIHtcbiAgICAgICAgLy8gTmV4dCB3ZSBmaW5kIHRoZSBmaXJzdCBvbmUgdGhhdCBpc24ndCB0aGUgc2FtZSB3aGljaCBzaG91bGQgYmUgdGhlXG4gICAgICAgIC8vIGZyYW1lIHRoYXQgY2FsbGVkIG91ciBzYW1wbGUgZnVuY3Rpb24gYW5kIHRoZSBjb250cm9sLlxuICAgICAgICBpZiAoc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgIC8vIEluIFY4LCB0aGUgZmlyc3QgbGluZSBpcyBkZXNjcmliaW5nIHRoZSBtZXNzYWdlIGJ1dCBvdGhlciBWTXMgZG9uJ3QuXG4gICAgICAgICAgLy8gSWYgd2UncmUgYWJvdXQgdG8gcmV0dXJuIHRoZSBmaXJzdCBsaW5lLCBhbmQgdGhlIGNvbnRyb2wgaXMgYWxzbyBvbiB0aGUgc2FtZVxuICAgICAgICAgIC8vIGxpbmUsIHRoYXQncyBhIHByZXR0eSBnb29kIGluZGljYXRvciB0aGF0IG91ciBzYW1wbGUgdGhyZXcgYXQgc2FtZSBsaW5lIGFzXG4gICAgICAgICAgLy8gdGhlIGNvbnRyb2wuIEkuZS4gYmVmb3JlIHdlIGVudGVyZWQgdGhlIHNhbXBsZSBmcmFtZS4gU28gd2UgaWdub3JlIHRoaXMgcmVzdWx0LlxuICAgICAgICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB5b3UgcGFzc2VkIGEgY2xhc3MgdG8gZnVuY3Rpb24gY29tcG9uZW50LCBvciBub24tZnVuY3Rpb24uXG4gICAgICAgICAgaWYgKHMgIT09IDEgfHwgYyAhPT0gMSkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICBzLS07XG4gICAgICAgICAgICAgIGMtLTsgLy8gV2UgbWF5IHN0aWxsIGhhdmUgc2ltaWxhciBpbnRlcm1lZGlhdGUgZnJhbWVzIGZyb20gdGhlIGNvbnN0cnVjdCBjYWxsLlxuICAgICAgICAgICAgICAvLyBUaGUgbmV4dCBvbmUgdGhhdCBpc24ndCB0aGUgc2FtZSBzaG91bGQgYmUgb3VyIG1hdGNoIHRob3VnaC5cblxuICAgICAgICAgICAgICBpZiAoYyA8IDAgfHwgc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgICAgICAgIC8vIFY4IGFkZHMgYSBcIm5ld1wiIHByZWZpeCBmb3IgbmF0aXZlIGNsYXNzZXMuIExldCdzIHJlbW92ZSBpdCB0byBtYWtlIGl0IHByZXR0aWVyLlxuICAgICAgICAgICAgICAgIHZhciBfZnJhbWUgPSAnXFxuJyArIHNhbXBsZUxpbmVzW3NdLnJlcGxhY2UoJyBhdCBuZXcgJywgJyBhdCAnKTsgLy8gSWYgb3VyIGNvbXBvbmVudCBmcmFtZSBpcyBsYWJlbGVkIFwiPGFub255bW91cz5cIlxuICAgICAgICAgICAgICAgIC8vIGJ1dCB3ZSBoYXZlIGEgdXNlci1wcm92aWRlZCBcImRpc3BsYXlOYW1lXCJcbiAgICAgICAgICAgICAgICAvLyBzcGxpY2UgaXQgaW4gdG8gbWFrZSB0aGUgc3RhY2sgbW9yZSByZWFkYWJsZS5cblxuXG4gICAgICAgICAgICAgICAgaWYgKGZuLmRpc3BsYXlOYW1lICYmIF9mcmFtZS5pbmNsdWRlcygnPGFub255bW91cz4nKSkge1xuICAgICAgICAgICAgICAgICAgX2ZyYW1lID0gX2ZyYW1lLnJlcGxhY2UoJzxhbm9ueW1vdXM+JywgZm4uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBfZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy8gUmV0dXJuIHRoZSBsaW5lIHdlIGZvdW5kLlxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZyYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChzID49IDEgJiYgYyA+PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICByZWVudHJ5ID0gZmFsc2U7XG5cbiAgICB7XG4gICAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBwcmV2aW91c0Rpc3BhdGNoZXI7XG4gICAgICByZWVuYWJsZUxvZ3MoKTtcbiAgICB9XG5cbiAgICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2U7XG4gIH0gLy8gRmFsbGJhY2sgdG8ganVzdCB1c2luZyB0aGUgbmFtZSBpZiB3ZSBjb3VsZG4ndCBtYWtlIGl0IHRocm93LlxuXG5cbiAgdmFyIG5hbWUgPSBmbiA/IGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUgOiAnJztcbiAgdmFyIHN5bnRoZXRpY0ZyYW1lID0gbmFtZSA/IGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKG5hbWUpIDogJyc7XG5cbiAge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBzeW50aGV0aWNGcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN5bnRoZXRpY0ZyYW1lO1xufVxuZnVuY3Rpb24gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKGZuLCBvd25lckZuKSB7XG4gIHtcbiAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZShmbiwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpIHtcbiAgdmFyIHByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gIHJldHVybiAhIShwcm90b3R5cGUgJiYgcHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZSwgb3duZXJGbikge1xuXG4gIGlmICh0eXBlID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB7XG4gICAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZSh0eXBlLCBzaG91bGRDb25zdHJ1Y3QodHlwZSkpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUodHlwZSk7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlJyk7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSgnU3VzcGVuc2VMaXN0Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBkZXNjcmliZUZ1bmN0aW9uQ29tcG9uZW50RnJhbWUodHlwZS5yZW5kZXIpO1xuXG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgLy8gTWVtbyBtYXkgY29udGFpbiBhbnkgY29tcG9uZW50IHR5cGUgc28gd2UgcmVjdXJzaXZlbHkgcmVzb2x2ZSBpdC5cbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVih0eXBlLnR5cGUsIG93bmVyRm4pO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIExhenkgbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGluaXQocGF5bG9hZCksIG93bmVyRm4pO1xuICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudE93bmVyO1xudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xudmFyIFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0UgPSBTeW1ib2wuZm9yKCdyZWFjdC5jbGllbnQucmVmZXJlbmNlJyk7XG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd247XG52YXIgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG52YXIgZGlkV2FybkFib3V0U3RyaW5nUmVmcztcblxue1xuICBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzID0ge307XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZChjb25maWcsIHNlbGYpIHtcbiAge1xuICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZiA9PT0gJ3N0cmluZycgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCAmJiBzZWxmICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuc3RhdGVOb2RlICE9PSBzZWxmKSB7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuXG4gICAgICBpZiAoIWRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgZXJyb3IoJ0NvbXBvbmVudCBcIiVzXCIgY29udGFpbnMgdGhlIHN0cmluZyByZWYgXCIlc1wiLiAnICsgJ1N1cHBvcnQgZm9yIHN0cmluZyByZWZzIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiAnICsgJ1RoaXMgY2FzZSBjYW5ub3QgYmUgYXV0b21hdGljYWxseSBjb252ZXJ0ZWQgdG8gYW4gYXJyb3cgZnVuY3Rpb24uICcgKyAnV2UgYXNrIHlvdSB0byBtYW51YWxseSBmaXggdGhpcyBjYXNlIGJ5IHVzaW5nIHVzZVJlZigpIG9yIGNyZWF0ZVJlZigpIGluc3RlYWQuICcgKyAnTGVhcm4gbW9yZSBhYm91dCB1c2luZyByZWZzIHNhZmVseSBoZXJlOiAnICsgJ2h0dHBzOi8vcmVhY3QuZGV2L2xpbmsvc3RyaWN0LW1vZGUtc3RyaW5nLXJlZicsIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpLCBjb25maWcucmVmKTtcblxuICAgICAgICBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzW2NvbXBvbmVudE5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHtcbiAgICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9yZWFjdC5kZXYvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAge1xuICAgICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcblxuICAgICAgICAgIGVycm9yKCclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgbm90IHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQGludGVybmFsXG4gKi9cblxuXG5mdW5jdGlvbiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCBfcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgcmVmO1xuXG4gIHtcbiAgICByZWYgPSBfcmVmO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQ7XG5cbiAge1xuICAgIC8vIEluIHByb2QsIGByZWZgIGlzIGEgcmVndWxhciBwcm9wZXJ0eS4gSXQgd2lsbCBiZSByZW1vdmVkIGluIGFcbiAgICAvLyBmdXR1cmUgcmVsZWFzZS5cbiAgICBlbGVtZW50ID0ge1xuICAgICAgLy8gVGhpcyB0YWcgYWxsb3dzIHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGtleToga2V5LFxuICAgICAgcmVmOiByZWYsXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgICAgX293bmVyOiBvd25lclxuICAgIH07XG4gIH1cblxuICB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307IC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7IC8vIGRlYnVnSW5mbyBjb250YWlucyBTZXJ2ZXIgQ29tcG9uZW50IGRlYnVnIGluZm9ybWF0aW9uLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfZGVidWdJbmZvJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogbnVsbFxuICAgIH0pO1xuXG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxudmFyIGRpZFdhcm5BYm91dEtleVNwcmVhZCA9IHt9O1xuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZmNzL3B1bGwvMTA3XG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5cbmZ1bmN0aW9uIGpzeERFViQxKHR5cGUsIGNvbmZpZywgbWF5YmVLZXksIGlzU3RhdGljQ2hpbGRyZW4sIHNvdXJjZSwgc2VsZikge1xuICB7XG4gICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkpIHtcbiAgICAgIC8vIFRoaXMgaXMgYW4gaW52YWxpZCBlbGVtZW50IHR5cGUuXG4gICAgICAvL1xuICAgICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAgIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG4gICAgICB2YXIgaW5mbyA9ICcnO1xuXG4gICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHlwZVN0cmluZztcblxuICAgICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9ICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh0eXBlKSkge1xuICAgICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICB0eXBlU3RyaW5nID0gXCI8XCIgKyAoZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ1Vua25vd24nKSArIFwiIC8+XCI7XG4gICAgICAgIGluZm8gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGluc3RlYWQgb2YgYSBjb21wb25lbnQ/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICAgIH1cblxuICAgICAgZXJyb3IoJ1JlYWN0LmpzeDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlU3RyaW5nLCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhpcyBpcyBhIHZhbGlkIGVsZW1lbnQgdHlwZS5cbiAgICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZ1xuICAgICAgLy8gZXJyb3JzLiBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kXG4gICAgICAvLyBwcm9kLiAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGVcbiAgICAgIC8vIHR5cGUgaXMgZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgICAgdmFyIGNoaWxkcmVuID0gY29uZmlnLmNoaWxkcmVuO1xuXG4gICAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXNTdGF0aWNDaGlsZHJlbikge1xuICAgICAgICAgIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhjaGlsZHJlbltpXSwgdHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignUmVhY3QuanN4OiBTdGF0aWMgY2hpbGRyZW4gc2hvdWxkIGFsd2F5cyBiZSBhbiBhcnJheS4gJyArICdZb3UgYXJlIGxpa2VseSBleHBsaWNpdGx5IGNhbGxpbmcgUmVhY3QuanN4cyBvciBSZWFjdC5qc3hERVYuICcgKyAnVXNlIHRoZSBCYWJlbCB0cmFuc2Zvcm0gaW5zdGVhZC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoY2hpbGRyZW4sIHR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBXYXJuIGFib3V0IGtleSBzcHJlYWQgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSB0eXBlIGlzIHZhbGlkLlxuXG5cbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNvbmZpZykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiBrICE9PSAna2V5JztcbiAgICAgIH0pO1xuICAgICAgdmFyIGJlZm9yZUV4YW1wbGUgPSBrZXlzLmxlbmd0aCA+IDAgPyAne2tleTogc29tZUtleSwgJyArIGtleXMuam9pbignOiAuLi4sICcpICsgJzogLi4ufScgOiAne2tleTogc29tZUtleX0nO1xuXG4gICAgICBpZiAoIWRpZFdhcm5BYm91dEtleVNwcmVhZFtjb21wb25lbnROYW1lICsgYmVmb3JlRXhhbXBsZV0pIHtcbiAgICAgICAgdmFyIGFmdGVyRXhhbXBsZSA9IGtleXMubGVuZ3RoID4gMCA/ICd7JyArIGtleXMuam9pbignOiAuLi4sICcpICsgJzogLi4ufScgOiAne30nO1xuXG4gICAgICAgIGVycm9yKCdBIHByb3BzIG9iamVjdCBjb250YWluaW5nIGEgXCJrZXlcIiBwcm9wIGlzIGJlaW5nIHNwcmVhZCBpbnRvIEpTWDpcXG4nICsgJyAgbGV0IHByb3BzID0gJXM7XFxuJyArICcgIDwlcyB7Li4ucHJvcHN9IC8+XFxuJyArICdSZWFjdCBrZXlzIG11c3QgYmUgcGFzc2VkIGRpcmVjdGx5IHRvIEpTWCB3aXRob3V0IHVzaW5nIHNwcmVhZDpcXG4nICsgJyAgbGV0IHByb3BzID0gJXM7XFxuJyArICcgIDwlcyBrZXk9e3NvbWVLZXl9IHsuLi5wcm9wc30gLz4nLCBiZWZvcmVFeGFtcGxlLCBjb21wb25lbnROYW1lLCBhZnRlckV4YW1wbGUsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgIGRpZFdhcm5BYm91dEtleVNwcmVhZFtjb21wb25lbnROYW1lICsgYmVmb3JlRXhhbXBsZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm9wTmFtZTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG4gICAgdmFyIHByb3BzID0ge307XG4gICAgdmFyIGtleSA9IG51bGw7XG4gICAgdmFyIHJlZiA9IG51bGw7IC8vIEN1cnJlbnRseSwga2V5IGNhbiBiZSBzcHJlYWQgaW4gYXMgYSBwcm9wLiBUaGlzIGNhdXNlcyBhIHBvdGVudGlhbFxuICAgIC8vIGlzc3VlIGlmIGtleSBpcyBhbHNvIGV4cGxpY2l0bHkgZGVjbGFyZWQgKGllLiA8ZGl2IHsuLi5wcm9wc30ga2V5PVwiSGlcIiAvPlxuICAgIC8vIG9yIDxkaXYga2V5PVwiSGlcIiB7Li4ucHJvcHN9IC8+ICkuIFdlIHdhbnQgdG8gZGVwcmVjYXRlIGtleSBzcHJlYWQsXG4gICAgLy8gYnV0IGFzIGFuIGludGVybWVkaWFyeSBzdGVwLCB3ZSB3aWxsIHVzZSBqc3hERVYgZm9yIGV2ZXJ5dGhpbmcgZXhjZXB0XG4gICAgLy8gPGRpdiB7Li4ucHJvcHN9IGtleT1cIkhpXCIgLz4sIGJlY2F1c2Ugd2UgYXJlbid0IGN1cnJlbnRseSBhYmxlIHRvIHRlbGwgaWZcbiAgICAvLyBrZXkgaXMgZXhwbGljaXRseSBkZWNsYXJlZCB0byBiZSB1bmRlZmluZWQgb3Igbm90LlxuXG4gICAgaWYgKG1heWJlS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihtYXliZUtleSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9ICcnICsgbWF5YmVLZXk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjb25maWcua2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICB7XG4gICAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICB9XG5cbiAgICAgIHtcbiAgICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgc2VsZik7XG4gICAgICB9XG4gICAgfSAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG5cblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAvLyBTa2lwIG92ZXIgcmVzZXJ2ZWQgcHJvcCBuYW1lc1xuICAgICAgcHJvcE5hbWUgIT09ICdrZXknICYmIChwcm9wTmFtZSAhPT0gJ3JlZicpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcblxuICAgICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZikge1xuICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcblxuICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICB7XG4gICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICB7XG4gICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fCAhbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub2RlLiQkdHlwZW9mID09PSBSRUFDVF9DTElFTlRfUkVGRVJFTkNFKSA7IGVsc2UgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgICAvLyBidXQgbm93IHdlIHByaW50IGEgc2VwYXJhdGUgd2FybmluZyBmb3IgdGhlbSBsYXRlci5cbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcblxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBAZmluYWxcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAge1xuICAgIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcblxuICAgIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlOyAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAgIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG5cbiAgICB2YXIgY2hpbGRPd25lciA9ICcnO1xuXG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgICAgY2hpbGRPd25lciA9IFwiIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tIFwiICsgZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKGVsZW1lbnQuX293bmVyLnR5cGUpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICBlcnJvcignRWFjaCBjaGlsZCBpbiBhIGxpc3Qgc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9yZWFjdC5kZXYvbGluay93YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KSB7XG4gIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICB2YXIgc3RhY2sgPSBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoZWxlbWVudC50eXBlLCBvd25lciA/IG93bmVyLnR5cGUgOiBudWxsKTtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB7XG4gICAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICAgIGlmICghaW5mbykge1xuICAgICAgdmFyIHBhcmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUocGFyZW50VHlwZSk7XG5cbiAgICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICAgIGluZm8gPSBcIlxcblxcbkNoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPFwiICsgcGFyZW50TmFtZSArIFwiPi5cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5mbztcbiAgfVxufVxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVGcmFnbWVudFByb3BzKGZyYWdtZW50KSB7XG4gIC8vIFRPRE86IE1vdmUgdGhpcyB0byByZW5kZXIgcGhhc2UgaW5zdGVhZCBvZiBhdCBlbGVtZW50IGNyZWF0aW9uLlxuICB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcmFnbWVudC5wcm9wcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoa2V5ICE9PSAnY2hpbGRyZW4nICYmIGtleSAhPT0gJ2tleScpIHtcbiAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZnJhZ21lbnQpO1xuXG4gICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZyYWdtZW50LnJlZiAhPT0gbnVsbCkge1xuICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZnJhZ21lbnQpO1xuXG4gICAgICBlcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4nKTtcblxuICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBqc3hERVYgPSBqc3hERVYkMSA7XG5cbmV4cG9ydHMuRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xuZXhwb3J0cy5qc3hERVYgPSBqc3hERVY7XG4gIH0pKCk7XG59XG4iLAogICIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LWRldi1ydW50aW1lLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWpzeC1kZXYtcnVudGltZS5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwKICAiaW1wb3J0IHsgJCB9IGZyb20gXCJidW5cIlxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi9UaW1lci5jbGllbnRcIlxuaW1wb3J0IHsgRXhhbXBsZUNsaWVudFZpZXcgfSBmcm9tIFwiLi9leGFtcGxlMC5jbGllbnRcIlxuaW1wb3J0IHsgZG9TdHVmZk9uVGhlU2VydmVyIH0gZnJvbSBcIi4vZXhhbXBsZTAuc2VydmVyXCJcbmNvbnNvbGUuZGVidWcoXCJleGVjdXRpbmdcIiwgaW1wb3J0Lm1ldGEudXJsKVxuXG5leHBvcnQgZnVuY3Rpb24gSG9tZVBhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPG1haW4+XG4gICAgICA8aDE+SGVsbG8sIHdvcmxkITwvaDE+XG4gICAgICA8aDI+XG4gICAgICAgIDxUaW1lciAvPlxuICAgICAgPC9oMj5cblxuICAgICAgPFVuYW1lIC8+XG4gICAgICB7LyogPFNlcnZlckNvZGVfZnJvbVVzZUNsaWVudEZpbGUgLz4gKi99XG4gICAgICA8U2VydmVyQ29kZV9mcm9tVXNlU2VydmVyRmlsZSAvPlxuICAgICAgPEV4YW1wbGVDbGllbnRWaWV3IC8+XG4gICAgPC9tYWluPlxuICApXG59XG5cbmFzeW5jIGZ1bmN0aW9uIFVuYW1lKCkge1xuICBjb25zdCB1bmFtZSA9IGF3YWl0ICRgdW5hbWUgLWFgLnRleHQoKVxuICByZXR1cm4gPGRpdj51bmFtZToge3VuYW1lfTwvZGl2PlxufVxuXG4vLyBhc3luYyBmdW5jdGlvbiBTZXJ2ZXJDb2RlX2Zyb21Vc2VDbGllbnRGaWxlKCkge1xuLy8gICBjb25zdCBzdHVmZiA9IGF3YWl0IGRvU3R1ZmZPblRoZVNlcnZlcl9kZWZpbmVkSW5DbGllbnRDb2RlKClcbi8vICAgcmV0dXJuIChcbi8vICAgICA8c2VjdGlvbj5cbi8vICAgICAgIDxoMj5kb1N0dWZmT25UaGVTZXJ2ZXJfZGVmaW5lZEluQ2xpZW50Q29kZTwvaDI+XG4vLyAgICAgICA8ZGl2PlxuLy8gICAgICAgICA8cHJlPntzdHVmZn08L3ByZT5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIDwvc2VjdGlvbj5cbi8vICAgKVxuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBTZXJ2ZXJDb2RlX2Zyb21Vc2VTZXJ2ZXJGaWxlKCkge1xuICBjb25zdCBzdHVmZiA9IGF3YWl0IGRvU3R1ZmZPblRoZVNlcnZlcigpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDI+ZG9TdHVmZk9uVGhlU2VydmVyPC9oMj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwcmU+e3N0dWZmfTwvcHJlPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG4iLAogICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJkb21cIiAvPlxuXCJ1c2UgY2xpZW50XCJcblxuY29uc29sZS5kZWJ1ZyhcImV4ZWN1dGluZ1wiLCBpbXBvcnQubWV0YS51cmwpXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb1N0dWZmT25UaGVTZXJ2ZXJfZGVmaW5lZEluQ2xpZW50Q29kZSgpIHtcbiAgXCJ1c2Ugc2VydmVyXCJcbiAgY29uc29sZS5hc3NlcnQodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiwgXCJUaGlzIGlzIHNlcnZlci1zaWRlIGNvZGUsIHNvIGB3aW5kb3dgIHNob3VsZCBub3QgYmUgZGVmaW5lZC5cIilcbiAgY29uc29sZS5kZWJ1ZyhcImV4ZWN1dGluZ1wiLCBpbXBvcnQubWV0YS51cmwsIFwiZG9TdHVmZk9uVGhlU2VydmVyX2RlZmluZWRJbkNsaWVudENvZGVcIiwgXCJydW5uaW5nIG9uIHRoZSBzZXJ2ZXI/XCIpXG5cbiAgY29uc3QgeyAkIH0gPSBhd2FpdCBpbXBvcnQoXCJidW5cIilcbiAgcmV0dXJuIGF3YWl0ICRgbHMgLWEgL2AudGV4dCgpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGFtcGxlQ2xpZW50RnVuY3Rpb24oKSB7XG4gIC8vIFwidXNlIGNsaWVudFwiIGlzIG5vdCBuZWNlc3NhcnkgaGVyZSwgYmVjYXVzZSBpdCdzIGFscmVhZHkgYXQgdGhlIHRvcCBvZiB0aGUgZmlsZVxuICBjb25zb2xlLmFzc2VydCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiLCBcIlRoaXMgaXMgY2xpZW50LXNpZGUgY29kZSwgc28gYHdpbmRvd2Agc2hvdWxkIGJlIGRlZmluZWQuXCIpXG4gIGNvbnNvbGUubG9nKFwiSGVsbG8gZnJvbSBleGFtcGxlMCFcIilcbiAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGRvU3R1ZmZPblRoZVNlcnZlcl9kZWZpbmVkSW5DbGllbnRDb2RlKClcbiAgY29uc29sZS5sb2coXCJTZXJ2ZXIgc3R1ZmYgZG9uZSFcIilcbiAgY29uc29sZS5sb2cocmVzdWx0cylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV4YW1wbGVDbGllbnRWaWV3KCkge1xuICAvLyBcInVzZSBjbGllbnRcIiBpcyBub3QgbmVjZXNzYXJ5IGhlcmUsIGJlY2F1c2UgaXQncyBhbHJlYWR5IGF0IHRoZSB0b3Agb2YgdGhlIGZpbGVcbiAgY29uc29sZS5hc3NlcnQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiwgXCJUaGlzIGlzIGNsaWVudC1zaWRlIGNvZGUsIHNvIGB3aW5kb3dgIHNob3VsZCBiZSBkZWZpbmVkLlwiKVxuICByZXR1cm4gPGRpdj5FeGFtcGxlQ2xpZW50VmlldzwvZGl2PlxufVxuIiwKICAiaW1wb3J0IHsgJCB9IGZyb20gXCJidW5cIlxuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi9UaW1lci5jbGllbnRcIlxuaW1wb3J0IHsgRXhhbXBsZUNsaWVudFZpZXcgfSBmcm9tIFwiLi9leGFtcGxlMC5jbGllbnRcIlxuaW1wb3J0IHsgZG9TdHVmZk9uVGhlU2VydmVyIH0gZnJvbSBcIi4vZXhhbXBsZTAuc2VydmVyXCJcbmNvbnNvbGUuZGVidWcoXCJleGVjdXRpbmdcIiwgaW1wb3J0Lm1ldGEudXJsKVxuXG5leHBvcnQgZnVuY3Rpb24gSG9tZVBhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPG1haW4+XG4gICAgICA8aDE+SGVsbG8sIHdvcmxkITwvaDE+XG4gICAgICA8aDI+XG4gICAgICAgIDxUaW1lciAvPlxuICAgICAgPC9oMj5cblxuICAgICAgPFVuYW1lIC8+XG4gICAgICB7LyogPFNlcnZlckNvZGVfZnJvbVVzZUNsaWVudEZpbGUgLz4gKi99XG4gICAgICA8U2VydmVyQ29kZV9mcm9tVXNlU2VydmVyRmlsZSAvPlxuICAgICAgPEV4YW1wbGVDbGllbnRWaWV3IC8+XG4gICAgPC9tYWluPlxuICApXG59XG5cbmFzeW5jIGZ1bmN0aW9uIFVuYW1lKCkge1xuICBjb25zdCB1bmFtZSA9IGF3YWl0ICRgdW5hbWUgLWFgLnRleHQoKVxuICByZXR1cm4gPGRpdj51bmFtZToge3VuYW1lfTwvZGl2PlxufVxuXG4vLyBhc3luYyBmdW5jdGlvbiBTZXJ2ZXJDb2RlX2Zyb21Vc2VDbGllbnRGaWxlKCkge1xuLy8gICBjb25zdCBzdHVmZiA9IGF3YWl0IGRvU3R1ZmZPblRoZVNlcnZlcl9kZWZpbmVkSW5DbGllbnRDb2RlKClcbi8vICAgcmV0dXJuIChcbi8vICAgICA8c2VjdGlvbj5cbi8vICAgICAgIDxoMj5kb1N0dWZmT25UaGVTZXJ2ZXJfZGVmaW5lZEluQ2xpZW50Q29kZTwvaDI+XG4vLyAgICAgICA8ZGl2PlxuLy8gICAgICAgICA8cHJlPntzdHVmZn08L3ByZT5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIDwvc2VjdGlvbj5cbi8vICAgKVxuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBTZXJ2ZXJDb2RlX2Zyb21Vc2VTZXJ2ZXJGaWxlKCkge1xuICBjb25zdCBzdHVmZiA9IGF3YWl0IGRvU3R1ZmZPblRoZVNlcnZlcigpXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDI+ZG9TdHVmZk9uVGhlU2VydmVyPC9oMj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwcmU+e3N0dWZmfTwvcHJlPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG4iCiAgXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxNQUFJLE1BQXVDO0FBQ3pDLGFBQVMsR0FBRztBQUtkLGlCQUNTLG1DQUFtQyxzQkFDbkMsK0JBQStCLGdDQUNwQyxZQUNGO0FBQ0EsdUNBQStCLDRCQUE0QixJQUFJLEtBQU87QUFBQSxNQUN4RTtBQUNVLFVBQUksZUFBZTtBQU03QixVQUFJLHFCQUFxQixPQUFPLElBQUksZUFBZTtBQUNuRCxVQUFJLG9CQUFvQixPQUFPLElBQUksY0FBYztBQUNqRCxVQUFJLHNCQUFzQixPQUFPLElBQUksZ0JBQWdCO0FBQ3JELFVBQUkseUJBQXlCLE9BQU8sSUFBSSxtQkFBbUI7QUFDM0QsVUFBSSxzQkFBc0IsT0FBTyxJQUFJLGdCQUFnQjtBQUNyRCxVQUFJLHNCQUFzQixPQUFPLElBQUksZ0JBQWdCO0FBRXJELFVBQUksc0JBQXNCLE9BQU8sSUFBSSxnQkFBZ0I7QUFDckQsVUFBSSxxQkFBcUIsT0FBTyxJQUFJLGVBQWU7QUFDbkQsVUFBSSx5QkFBeUIsT0FBTyxJQUFJLG1CQUFtQjtBQUMzRCxVQUFJLHNCQUFzQixPQUFPLElBQUksZ0JBQWdCO0FBQ3JE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O0FBRUEsY0FBSSxTQUFTLFFBQVEsTUFBTTtBQUN6QiwwQ0FBOEIsUUFBUTtBQUV0QyxrQkFBTSx1REFBdUQ7QUFFN0QsMENBQThCLElBQUk7QUFBQSxVQUNwQztBQUFBLFFBQ0Y7QUFBQTtBQUdGLFVBQUksU0FBUztBQUViLE1BQVEsbUJBQVc7QUFDbkIsTUFBUSxpQkFBUztBQUFBLE9BQ1o7QUFBQSxFQUNMO0FBQUE7OztBQ0JBSzJCO0FBSDNCLE1BQUksT0FBdUM7QUFBQSxFQUUzQyxPQUFPO0FBQ0wsV0FBTyxVQUFrQjtBQUFBO0FBQUE7OztBQ3BnZ2dnZ0IzQkFBO0FBQ0EsaUJBQVM7OztBQ0JUdUJPLFNBQVMsaUJBQWlCLEdBQUc7QUFFbEMsVUFBUSxjQUFjLFdBQVcsYUFBYSwwREFBMEQ7QUFDeEcsU0FBTyx1QkFBd0IsT0FBeEI7QUFBQTtBQUFBLHNDQUF3QjtBQUFBO0FBekJqQztBQUVBLFFBQVEsTUFBTSxhQUFhLFlBQVksR0FBRzsiLAogICJkZWJ1Z0lkIjogIjY5N0NBNDQ4Mzc3ODBCNUI2NDc1NmUyMTY0NzU2ZTIxIiwKICAibmFtZXMiOiBbXQp9
