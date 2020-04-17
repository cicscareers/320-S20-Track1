def dictionary_to_list(dictionary):
    params = []
    valueType = ""
    #For each key, name = key and value = dictionary {value type : value}
    for key in dictionary.keys():
        if(type(dictionary[key]) == int):
            valueType = 'longValue'
        if(type(dictionary[key]) == str):
            valueType = 'stringValue'
        if(type(dictionary[key]) == bool):
            valueType = 'booleanValue'
        if(type(dictionary[key]) == float):
            valueType = 'doubleValue'
        params.append({'name': key, 'value': {valueType : dictionary[key]}})
    return params