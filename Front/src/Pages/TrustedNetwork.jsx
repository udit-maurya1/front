import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Plus, Phone, Mail, Trash2, CheckCircle, 
  AlertCircle, Heart, UserPlus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TrustedNetwork() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "family",
    priority: 1
  });

  const queryClient = useQueryClient();

  const { data: contacts = [] } = useQuery({
    queryKey: ['trustedContacts'],
    queryFn: () => base44.entities.TrustedContact.list('-priority'),
  });

  const createContactMutation = useMutation({
    mutationFn: (data) => base44.entities.TrustedContact.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trustedContacts'] });
      setShowAddDialog(false);
      setNewContact({ name: "", phone: "", email: "", relationship: "family", priority: 1 });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id) => base44.entities.TrustedContact.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trustedContacts'] });
    },
  });

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) return;
    await createContactMutation.mutateAsync(newContact);
  };

  const getRelationshipIcon = (relationship) => {
    const icons = {
      family: '👨‍👩‍👧‍👦',
      friend: '👥',
      colleague: '💼',
      neighbor: '🏘️',
      other: '👤'
    };
    return icons[relationship] || '👤';
  };

  const getRelationshipColor = (relationship) => {
    const colors = {
      family: 'red',
      friend: 'blue',
      colleague: 'purple',
      neighbor: 'green',
      other: 'slate'
    };
    return colors[relationship] || 'slate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted Network</h1>
            <p className="text-slate-600 mt-2">Manage your emergency contacts who will be notified during SOS</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Trusted Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select 
                    value={newContact.relationship}
                    onValueChange={(value) => setNewContact({...newContact, relationship: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="colleague">Colleague</SelectItem>
                      <SelectItem value="neighbor">Neighbor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority (1=Highest)</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    max="10"
                    value={newContact.priority}
                    onChange={(e) => setNewContact({...newContact, priority: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <Button 
                onClick={handleAddContact}
                disabled={!newContact.name || !newContact.phone || createContactMutation.isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Add Contact
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Banner */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">How it works</p>
                <p className="text-sm text-slate-600">
                  When you trigger an SOS alert, all your trusted contacts will receive an instant notification 
                  with your live location. Contacts are notified based on priority order.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900">{contacts.length}</div>
              <div className="text-sm text-slate-600 mt-1">Total Contacts</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900">
                {contacts.filter(c => c.is_verified).length}
              </div>
              <div className="text-sm text-slate-600 mt-1">Verified</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900">
                {contacts.filter(c => c.relationship === 'family').length}
              </div>
              <div className="text-sm text-slate-600 mt-1">Family Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts List */}
        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Your Trusted Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">No contacts added yet</p>
                <Button 
                  onClick={() => setShowAddDialog(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <Card 
                    key={contact.id}
                    className="border-2 hover:border-slate-300 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{getRelationshipIcon(contact.relationship)}</div>
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">{contact.name}</div>
                            <Badge 
                              variant="outline"
                              className={`bg-${getRelationshipColor(contact.relationship)}-50 text-${getRelationshipColor(contact.relationship)}-700 border-${getRelationshipColor(contact.relationship)}-200 capitalize`}
                            >
                              {contact.relationship}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Priority {contact.priority}
                          </Badge>
                          {contact.is_verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteContactMutation.mutate(contact.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}