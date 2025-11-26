#include<iostream>
using namespace std;
class A{
	public:
		int a;
		void getA(){
			cout<<"\nEnter the A:";
			cin>>a;
		}
};
class B : virtual public A{
	public:
		int b;
		void getB(){
			cout<<"\nEnter the B:";
			cin>>b;
		}
};
class C:virtual public A{
	public:
		int c;
		void getC(){
			cout<<"\nEnter the C:";
			cin>>c;
		}
};
class D:public B,public C{
	public:
		int d;
		void getD(){
			cout<<"Enter the D:";
			cin>>d;
		}
		void addition(){
			cout<<"\nAddition of all class varibale";
			cout<<a+b+c+d;
		}
};
main(){
	D d1;
	d1.getA();
	d1.getB();
	d1.getC();
	d1.getD();
	d1.addition();
}
