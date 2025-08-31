import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return 'FileText';
      case 'deadline':
        return 'Clock';
      case 'acceptance':
        return 'CheckCircle';
      case 'rejection':
        return 'XCircle';
      case 'interview':
        return 'Calendar';
      case 'update':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'application':
        return 'text-primary bg-primary/10';
      case 'deadline':
        return 'text-warning bg-warning/10';
      case 'acceptance':
        return 'text-success bg-success/10';
      case 'rejection':
        return 'text-destructive bg-destructive/10';
      case 'interview':
        return 'text-accent bg-accent/10';
      case 'update':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'important') return notification?.important;
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  if (notifications?.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="Bell" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
        <p className="text-muted-foreground">
          You're all caught up! Notifications about your applications and deadlines will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 mb-4 bg-muted p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', count: notifications?.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'important', label: 'Important', count: notifications?.filter(n => n?.important)?.length }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setFilter(tab?.key)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === tab?.key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab?.label} {tab?.count > 0 && `(${tab?.count})`}
            </button>
          ))}
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                notification?.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
              } hover:bg-muted/50`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${notification?.read ? 'text-foreground' : 'text-foreground font-semibold'}`}>
                      {notification?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-muted-foreground">{notification?.timestamp}</span>
                      {notification?.important && (
                        <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full font-medium">
                          Important
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!notification?.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkAsRead(notification?.id)}
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Check" size={12} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNotifications?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;