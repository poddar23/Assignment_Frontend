#include<iostream>
using namespace std;
class Parent {
    public:
    int a;
    Parent (int a){
        this-> a=a;
        cout<< "/n Parent class constructor a="<< this-> a;
    }
};
class Child: public Parent{
    public :
    int b,c ;
    Child(int b, int c, int a): Parent (a) {
        this-> b=b;
        this-> c=c;
        cout<< "/n Child class constructor b="<< this-> b << "c=" << this-> c;
    }
};
main(){
    Child c1 (12,23,45);
}
 