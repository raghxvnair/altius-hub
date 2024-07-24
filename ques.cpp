#include <bits/stdc++.h>

using namespace std;

class Node { 
public: 
    int data; 
    Node* next;
    Node() { 
        data = -1; 
        next = NULL; 
    } 
    Node(int data) { 
        this->data = data; 
        this->next = NULL; 
    } 
}; 

bool detectCycle(Node* head){
    if(!head->next) return false;

    Node* slow = head;
    Node* fast = head;
    //using the concept of slow and fast pointers
    //we slow moves ahead by 1 and fast by 2;
    //if there is a cycle slow and fast would meet at some point
    // when we hit that condition we return true;
    while(fast && fast->next){
        slow = slow->next;
        fast = fast->next->next;
        if(slow == fast) return true;
    }
    return false;
}

Node* reverse(Node* head){
    if(!head->next) return head;

    Node* prev= new Node();
    Node* forward = head;
    //we assign a prev node which acts as a dummy node
    //we also asign a forward node to reference the next node
    while(head){
        forward = head->next; //forward is assigned as next node
        head->next = prev; //we cut our current nodes connection and assign it to dummy node
        prev = head; //we move the prev to current node
        head = forward; //we move the current node to the previously assigned forwrd node
    }
    return prev;
}

int main(){
    Node* head = new Node(0);
    Node* curr = head;
    for(int i=1;i<=5;i++){
        Node* forward = new Node(i);
        curr->next = forward;
        curr = curr->next;
    }
    curr = head;

    //1 
    Node* rev = reverse(curr);
    while(rev->next){
        cout<<rev->data<<" ";
        rev = rev->next;
    }

    cout<<endl;

    //2
    Node* cycleHead = new Node(0);
    Node* cycleNext1 = new Node(1);
    Node* cycleNext2 = new Node(2);
    Node* cycleNext3 = new Node(3);

    cycleHead->next = cycleNext1;
    cycleNext1->next = cycleNext2;
    cycleNext2->next = cycleNext3;
    cycleNext3->next = cycleNext1; // just comment this out to test for no cycle
    

    // 0->1->2->3->1

    bool ans = detectCycle(cycleHead);

    if(ans == 1){
        cout<<"Cycle detected"<<endl;
    }
    else{
        cout<<"No cycle detected"<<endl;
    }

    return 0;
}