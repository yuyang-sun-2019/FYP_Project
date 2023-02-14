
import pandas as pd

import random

def read_excel():
    df = pd.read_excel('data.xlsx')

    df.head()
    return df

def carModels():
    input1=[]
    for index, row in df.iterrows():
        #plot = row['type of service for the list of parts']

        row['Car models']=str(row['Car models']).lower()
        if row['Car models'] not in input1:
            input1.append(row['Car models'])
    return input1

def componentList():
    input2=[]
    for index, row in df.iterrows():
        #plot = row['type of service for the list of parts']

        row['component list']=str(row['component list']).lower()
        if row['component list'] not in input2:
            input2.append(row['component list'])
    return input2

def getKeyWord(sentence):

    for keyWord in input1:
        if keyWord in sentence:
            return keyWord
    return None

def getKeyWord1(sentence):

    for keyWord in input2:
        if keyWord in sentence:
            return keyWord
    return None


def stochasticRecommender(df):
    l=len(df)
    count=l-10

    if count < 0:

        return df
    else:
        start=random.randint(1, count)
        end  =start+10
        return df[start:end]


######################################
def startChat():
    flag1=True
    flag2=True

    print("ROBO: What is your car model?")
    print("For example: Honda, Toyota, Mercedes Benz, BMW ...")
    document.getElementById("chatlog1").innerHTML="ROBO: What is your car model \n For example: Honda, Toyota, Mercedes Benz, BMW ..."
    while(flag1==True):

        user_response = input()
        user_response=user_response.lower()

        #print(user_response,input1)
        if(user_response =="0" or user_response =="exit" or user_response =="bye" ):
            flag1=False
            flag2=False
            print("ROBO:Thank you for chatting with me!")
            print("ROBO:If you have any further queries you may call our customer service office at +65 6789 6666")
            break
        user_response=getKeyWord(user_response)
        if(user_response not in input1 ):
            print("ROBO:Please enter a valid car model")
            print("For example: Honda, Toyota, Mercedes Benz, BMW ...")

        else:
            while(flag2==True):
                print("ROBO: What is the car component for repair?")
                print("For example:Engine, Camera, Brake,Coolant,Wheel,Battery...")
                user_response1=input()
                user_response1=user_response1.lower()
                if(user_response1 =="0" or user_response1 =="exit" or user_response1 =="bye" ):
                    recommender=df[(df['Car models']==user_response)]
                    flag1=False
                    flag2=False
                    recommender=stochasticRecommender(recommender)
                    print("ROBO:There are the possible services for you car model: \n",recommender)
                    print("ROBO:Thank you for chatting with me!")

                    break
                user_response1=getKeyWord1(user_response1)
                recommender=df[(df['Car models']==user_response) & (df['component list']==user_response1)]#['type of service']
                if len(recommender)>=1:
                    recommender=stochasticRecommender(recommender)
                    print("ROBO: Here is the service recommendation:\n",recommender)

                    flag2 = False
                else:
                    print("ROBO:Invalid component list, please enter again!")
                    print("For example:Engine, Camera, Brake, Coolant, Wheel, Battery...")

            flag1=False
    random.shuffle(input1)
    random.shuffle(input2)

if __name__ == '__main__':
    df=read_excel()
    input1=carModels()
    random.shuffle(input1)
    input2=componentList()
    random.shuffle(input2)
    startChat()



# https://blog.logrocket.com/pyscript-run-python-browser/
# python -m http.server
