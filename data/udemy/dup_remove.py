for idx, key_string in enumerate(list(dict_category.keys())):
    subcategory_id = dict_category.get(key_string)
    folder_path = root+key_string+"/"
    with open(folder_path+"data.json", "r", encoding="utf-8") as f:
        list_dic = json.load(f)
    dic = {}
    for k, value in list_dic.items():
        if(len(value["items"])==0):
            # print(f"{k}에서 stop")
            break
        dic[k] = value
    with open(f"{folder_path}data2.json", "w", encoding="utf-8") as f:
        json.dump(dic, f, ensure_ascii=False)