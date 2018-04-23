class ProxyFactory {

    static create(object, props, action){

        return new Proxy(object, {

            get(target, prop, receiver){

                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    
                    return function(){

                        console.log(`${prop} INTERCEPTED!`);
                        
                        // target[prop] is the function on the target object. (add() for example)
                        // target is the actual object
                        // arguments is the parameters past to the current method of the target object (add(...parameters) for example)
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                let retorno = Reflect.set(target, prop, value, receiver);

                if(props.includes(prop)){
                    target[prop] = value;
                    action(target);
                }

                return retorno;
            }
        })
    }

    static _isFunction(prop){
        return typeof(prop)==typeof(Function)
    }
}

